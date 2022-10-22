import { Item } from "../../models";
import { Loader } from "../ui";
import DataTableItem from "./DataTableItem";
import DataTablePaginationControls, {
  DataTablePaginationControlsProps,
} from "./DataTablePaginationControls";

import "./style.css";

type DataTableProps = {
  items: Item[] | undefined;
} & DataTablePaginationControlsProps;

const DataTable = ({ items, pagination, onChange }: DataTableProps) => {
  return (
    <div className="data-table">
      {items === undefined ? (
        <Loader />
      ) : items.length === 0 ? (
        <h2>No items found</h2>
      ) : (
        <div className="data-table_content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <DataTableItem
                  key={item.id.toString()}
                  cols={Object.entries(item)
                    .filter((e) => e[0] !== "id")
                    .map((e) =>
                      e[0] === "date"
                        ? new Date(
                            Date.parse(e[1].toString())
                          ).toLocaleDateString()
                        : e[1]
                    )}
                />
              ))}
            </tbody>
          </table>
          <DataTablePaginationControls
            pagination={pagination}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
