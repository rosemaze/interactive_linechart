import { CsvRow } from "../components/CsvUploader/CsvUploader.types";

export const getDataSourceOptions = (data: Array<CsvRow>) =>
  data
    .map((row) => row.dataSource)
    .filter((value, index, self) => self.indexOf(value) === index && value) // Only take unique and not undefined values
    .map((uniqueDatasource) => ({
      label: uniqueDatasource,
      value: uniqueDatasource,
    }));
