import { FilterCondition } from ".";

class Column {
  key: string;
  title: string;
  type: "string" | "integer" | "float";

  constructor(key: string, title: string, type: "string" | "integer" | "float"){
    this.key = key;
    this.title = title;
    this.type = type;
  }

  public get supportedFilterConditions(): FilterCondition[] {
    if (this.type === "string") {
      return [
        {
          title: "Equals",
          key: "equals",
        },
        {
          title: "Includes",
          key: "includes",
        },
      ];
    } else if(["integer", "float"].includes(this.type)) {
      return [
        {
          title: "Equals",
          key: "equals",
        },
        {
          title: "Greater than",
          key: "greater",
        },
        {
          title: "Lower than",
          key: "lower",
        },
      ]
    } else {
      throw new Error(`Type "${this.type}" is not implemented`)
    }
  }
}

export default Column;
