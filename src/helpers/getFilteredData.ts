import { CsvRow } from "../components/CsvUploader/CsvUploader.types";
import { SelectOption } from "../components/MultiSelector/MultiSelector.types";
import { ValueType } from "react-select";

export const getFilteredData = (options: {
  datasourcesToFilter: ValueType<SelectOption>[];
  campaignsToFilter: ValueType<SelectOption>[];
  data: CsvRow[];
}) => {
  const { datasourcesToFilter, campaignsToFilter, data } = options;

  const selectedDatasourceValues = datasourcesToFilter.map(
    (option) => (option as SelectOption).value
  );
  const selectedCampaignValues = campaignsToFilter.map(
    (option) => (option as SelectOption).value
  );

  return data.filter(
    (csvRow) =>
      selectedDatasourceValues.includes(csvRow.dataSource) &&
      selectedCampaignValues.includes(csvRow.campaign)
  );
};
