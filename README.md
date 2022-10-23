# WelbeX test

## Requirements

<ul>
    <li>
        <a href="https://nodejs.org/en/">Node.js</a>  v16.15.0 or above
    </li>
    <li>
        <a href="https://www.postgresql.org/">PostgreSQL</a> v14.5 or above
    </li>
</ul>

## How to run

1. Install the dependencies by running `npm install` in the directories `app/` and `server/`
2. Start SQL server and correct the database connection data in `server/database.js`
3. Create the table `items`:
```
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  DATE DATE,
  NAME VARCHAR(30),
  AMOUNT INTEGER,
  DISTANCE FLOAT8
);
```
4. Start the applications by running `npm start` in the directories `app/` and `server/`