import { useEffect, useState } from "react";
import { Column, FilterCondition, FilterValue } from "../../types";
import { compare } from "../../utils";
import { DropdownMenu, Input } from "../ui";
import { defaultFilterConditions, defaultFilterColumns } from "./defaultValues";

import "./style.css";

type FilteringToolsProps = {
  columns?: Column[];
  defaultValue?: FilterValue;
  onChange: (value: FilterValue) => void;
};

const FilteringTools = ({
  columns = defaultFilterColumns,
  defaultValue = {
    value: "",
  },
  onChange,
}: FilteringToolsProps) => {
  const [filterValue, setFilterValue] = useState<FilterValue>(defaultValue);

  useEffect(() => {
    onChange({
      ...filterValue,
      condition:
        filterValue.condition &&
        filterValue.column?.supportedFilterConditions.find((c) =>
          compare(c, filterValue.condition)
        )
          ? filterValue.condition
          : undefined,
      value:
        filterValue.value &&
        filterValue.column &&
        {
          integer: (e: string) => (isNaN(parseInt(e)) ? "" : parseInt(e)),
          float: (e: string) => (isNaN(parseFloat(e)) ? "" : parseFloat(e)),
          string: (e: string) => e,
        }
          [filterValue.column.type](filterValue.value)
          .toString(),
    });
  }, [filterValue.column]);

  useEffect(() => {
    onChange(filterValue);
  }, [filterValue.condition, filterValue.value]);

  return (
    <div className="filtering-tools">
      <div>
        <label>Filter by:</label>
        <DropdownMenu<Column>
          items={columns.map((c) => {
            return { key: c.key, title: c.title, value: c };
          })}
          value={filterValue.column}
          onChange={(value) => {
            setFilterValue({
              ...filterValue,
              column: value,
            });
          }}
        />
      </div>
      <div>
        <DropdownMenu<FilterCondition>
          items={(
            filterValue.column?.supportedFilterConditions ??
            defaultFilterConditions
          ).map((c) => {
            return { key: c.key, title: c.title, value: c };
          })}
          value={filterValue.condition}
          onChange={(value) => {
            setFilterValue({
              ...filterValue,
              condition: value,
            });
          }}
        />
      </div>
      <div>
        <Input
          value={filterValue.value}
          min={0}
          onChange={(value) => {
            setFilterValue({
              ...filterValue,
              value: value as string,
            });
          }}
          type={filterValue.column?.type === "string" ? "text" : "number"}
          {...(filterValue.column?.type === "string"
            ? {}
            : {
                step: filterValue.column?.type === "float" ? 0.001 : 1,
              })}
        />
      </div>
    </div>
  );
};

export default FilteringTools;
