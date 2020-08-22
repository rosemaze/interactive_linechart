export interface CsvRow {
  date: string;
  dataSource: string; // Could be enum?
  campaign: string;
  clicks: number;
  impressions: number;
}
