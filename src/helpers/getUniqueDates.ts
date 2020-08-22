import { CsvRow } from "../components/CsvUploader/CsvUploader.types";
import { parseDate } from "./parseDate";

export const getUniqueDates = (data: CsvRow[]) =>
  data
    .map((row) => row.date)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((uniqueDate) => new Date(parseDate(uniqueDate)));
