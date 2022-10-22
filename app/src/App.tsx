import { useEffect, useState } from "react";
import "./App.css";
import { FilteringTools, DataTable } from "./components";
import axios from "axios";
import { Item } from "./models";
import { FilterValue, PaginationState } from "./types";
import { compare } from "./utils";

function App() {
  const [items, setItems] = useState<Item[]>();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 6,
    total: 0,
  });
  const [filter, setFilter] = useState<FilterValue>();

  const loadItems = () => {
    axios
      .post(
        "http://localhost:8000/",
        JSON.stringify({
          column: filter?.column?.key,
          condition: filter?.condition?.key,
          value: filter?.value,
          pageSize: pagination.pageSize,
          page: pagination.page,
        })
      )
      .then((response) => {
        if (response.status === 200) {
          setItems(response.data.items);
          if (!compare(response.data.pagination, pagination)) {
            setPagination(response.data.pagination);
          }
        }
      });
  };

  useEffect(() => {
    loadItems();
  }, [filter, pagination]);

  return (
    <div className="App">
      <FilteringTools onChange={setFilter} />
      <DataTable
        items={items}
        pagination={pagination}
        onChange={setPagination}
      />
    </div>
  );
}

export default App;
