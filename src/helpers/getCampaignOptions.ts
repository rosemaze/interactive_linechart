// Todo make this generic with getUniqueDataSources
import { CsvRow } from "../components/CsvUploader/CsvUploader.types";

export const getCampaignOptions = (data: Array<CsvRow>) =>
  data
    .map((row) => row.campaign)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((uniqueCampaign) => ({
      label: uniqueCampaign,
      value: uniqueCampaign,
    }));
