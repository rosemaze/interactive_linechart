import React from "react";
import Select, { ValueType } from "react-select";
import { getOptionsFromValues } from "./helpers/getOptionsFromValues";
import { SelectOption, SELECT_ALL_OPTION } from "./MultiSelector.types";

interface Props {
  options: SelectOption[];
  selectedOptions: ValueType<SelectOption>[];
  onHandleChange: (values: ValueType<SelectOption>[]) => void;
}

export const MultiSelector: React.FC<Props> = (props) => {
  const { options, onHandleChange, selectedOptions } = props;

  const handleChange = React.useCallback(
    (options: ValueType<SelectOption> | ValueType<SelectOption>[]) => {
      if (!options) {
        return;
      }

      if (Array.isArray(options)) {
        // Check if SELECT_ALL was selected
        const lastOptionIsSelectAll =
          options.length > 0 &&
          (options[options.length - 1] as SelectOption).value ===
            SELECT_ALL_OPTION.value;

        if (lastOptionIsSelectAll) {
          // If SELECT_ALL was selected, zap everything else
          onHandleChange([SELECT_ALL_OPTION]);
          return;
        }

        // Otherwise remove SELECT_ALL if any other option was selected
        const optionsWithoutSelectAll = options.filter(
          (option) => (option as SelectOption).value !== SELECT_ALL_OPTION.value
        );

        onHandleChange(optionsWithoutSelectAll);
      }
    },
    []
  );

  return (
    <Select
      options={options}
      value={getOptionsFromValues(selectedOptions)}
      onChange={handleChange}
      isMulti
    />
  );
};
