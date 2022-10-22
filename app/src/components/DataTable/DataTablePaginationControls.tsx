import { PaginationState } from "../../types";
import { Input } from "../ui";

export type DataTablePaginationControlsProps = {
  pagination: PaginationState;
  onChange: (state: PaginationState) => void;
};

const DataTablePaginationControls = ({
  pagination,
  onChange,
}: DataTablePaginationControlsProps) => {
  const maxPage = Math.ceil(pagination.total / pagination.pageSize);
  return (
    <div className="pagination-controls">
      <button
        disabled={pagination.page === 1}
        onClick={() => {
          onChange({
            ...pagination,
            page: 1,
          });
        }}
      >
        {"<<"}
      </button>
      <button
        disabled={pagination.page === 1}
        onClick={() => {
          onChange({
            ...pagination,
            page: Math.max(pagination.page - 1, 1),
          });
        }}
      >
        {"<"}
      </button>
      <div className="pagination-controls_main">
        <label htmlFor="page-number">Page: </label>
        <Input
          id="page-number"
          type="number"
          min={1}
          max={maxPage}
          value={pagination.page.toString()}
          onChange={(value) => {
            onChange({
              ...pagination,
              page: parseInt(value as string),
            });
          }}
        />
        <label htmlFor="page-size">Page size: </label>
        <Input
          id="page-size"
          type="number"
          min={6}
          max={20}
          value={pagination.pageSize.toString()}
          onChange={(value) => {
            onChange({
              ...pagination,
              pageSize: parseInt(value as string),
            });
          }}
        />
      </div>
      <button
        disabled={maxPage <= pagination.page}
        onClick={() => {
          onChange({
            ...pagination,
            page: Math.max(pagination.page + 1, 1),
          });
        }}
      >
        {">"}
      </button>
      <button
        disabled={maxPage <= pagination.page}
        onClick={() => {
          onChange({
            ...pagination,
            page: maxPage,
          });
        }}
      >
        {">>"}
      </button>
    </div>
  );
};

export default DataTablePaginationControls;
