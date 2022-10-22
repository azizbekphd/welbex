import { Column, FilterCondition } from "../../types";

const defaultFilterConditions: FilterCondition[] = [
  {
    title: "Equals",
    key: "equals",
  },
  {
    title: "Includes",
    key: "includes",
  },
  {
    title: "Greater than",
    key: "greater",
  },
  {
    title: "Lower than",
    key: "lower",
  },
];

const defaultFilterColumns: Column[] = [
  new Column("name","Name","string"),
  new Column("amount","Amount","integer"),
  new Column("distance","Distance","float"),
];

export { defaultFilterColumns, defaultFilterConditions };
