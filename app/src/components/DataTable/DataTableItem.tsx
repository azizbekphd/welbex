type DataTableItemProps = {
    cols: string[]
}

const DataTableItem = ({cols}: DataTableItemProps) => {
    return <tr>
        {cols.map((col, index) => <td key={index.toString()}>{col}</td>)}
    </tr>
}

export default DataTableItem;