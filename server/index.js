const http = require('http');
const Pool = require('pg').Pool
const pool = new Pool(require("./database"))

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    const { url, method } = req;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Max-Age', 2592000);

    let body = []
    req.on('error', (err) => {
        console.log(err)
    }).on('data', (chunk) => {
        body.push(chunk)
    }).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString())

        res.on('error', (err) => {
            console.log(err);
        })

        if (url === "/" && method === "POST") {

            let { page, pageSize } = body;

            let query;

            if ([true, "column", "condition", "value"].reduce((a, b) => a && body.hasOwnProperty(b) && body[b])) {
                let { column, condition, value } = body;

                condition = {
                    "equals": "=",
                    "includes": "LIKE",
                    "greater": ">",
                    "lower": "<"
                }[condition]

                if (condition === "LIKE") {
                    value = `%${value}%`
                }

                query = pool.query(`SELECT * FROM items
                    WHERE ${column} ${condition} $1
                    ORDER BY name ASC, amount ASC, distance ASC`, [value])
            } else {
                query = pool.query(`SELECT * FROM items
                ORDER BY name ASC, amount ASC, distance ASC`)
            }

            query.then((value) => {
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 200;
                let total = value.rowCount;
                pageSize = Math.min(Math.max(pageSize, 6), total);
                page = Math.max(1, Math.min(page, Math.ceil(total / pageSize)));
                let start = (page - 1) * pageSize;
                let end = Math.min(page * pageSize, total);
                res.end(JSON.stringify({
                    items: value.rows.slice(
                        start,
                        end
                    ),
                    pagination: {
                        page: page,
                        pageSize: pageSize,
                        total: total,
                    },
                }))
            }, (reason) => {
                res.statusCode = 500;
                res.end(reason.toString())
            })
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});