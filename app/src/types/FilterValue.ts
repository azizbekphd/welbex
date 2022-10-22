import Column from "./Column"
import FilterCondition from "./FilterCondition";

type FilterValue = {
    column?: Column,
    condition?: FilterCondition,
    value?: string,
}

export default FilterValue;