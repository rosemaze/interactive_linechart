import { ValueType } from "react-select";
import { SelectOption } from "../MultiSelector.types";

export const getOptionsFromValues = (values: ValueType<SelectOption>[]) =>
  values.map((value) => ({
    label: (value as SelectOption).value,
    value: (value as SelectOption).value,
  }));
