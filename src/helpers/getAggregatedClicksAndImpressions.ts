import { CsvRow } from "../components/CsvUploader/CsvUploader.types";
import { parseDate } from "./parseDate";

/*********
 * NOTE: This function works on the assumption that the data is ALREADY SORTED by dates as provided in the test data for this challenge!
 * For each row
 * Take the date and compare it with the previous date
 * If it is the same then add the clicks, and impressions to total clicks and total impressions
 * If date is different then
 * make a date item for the previous date, add to dateXAxes,
 * add an item for previous aggregated total clicks to clicksYAxes
 * add an item for previous aggregated total impressions to impressionsYAxes
 */

export const getAggregatedClicksAndImpressions = (options: {
  filteredData: CsvRow[];
}) => {
  const { filteredData: data } = options;

  let groupedAggregatedImpressions: number[] = [];
  let groupedAggregatedClicks: number[] = [];
  let allFilteredDates: Date[] = [];

  if (data.length <= 0) {
    return {
      groupedAggregatedImpressions,
      groupedAggregatedClicks,
      allFilteredDates,
    };
  }

  // Set previous date to first date in the sorted list
  let prevDate = data[0].date;
  let currentDate = data[0].date;
  let totalClicksForCurrentDate: number = 0;
  let totalImpressionsForCurrentDate: number = 0;

  data.forEach((row) => {
    currentDate = row.date;

    // If current date is the same as previous date then add the clicks, and impressions to total clicks and total impressions
    if (currentDate === prevDate) {
      totalClicksForCurrentDate += row.clicks;
      totalImpressionsForCurrentDate += row.impressions;
      return;
    }

    // If date is different then
    // make a date item for the previous date, add to dateXAxes,
    // add an item for previous aggregated total clicks to clicksYAxes
    // add an item for previous aggregated total impressions to impressionsYAxes
    allFilteredDates.push(new Date(parseDate(row.date)));
    groupedAggregatedClicks.push(totalClicksForCurrentDate);
    groupedAggregatedImpressions.push(totalImpressionsForCurrentDate);

    // Set grouped aggregated values for next iteration
    totalClicksForCurrentDate = row.clicks;
    totalImpressionsForCurrentDate = row.impressions;

    // Set current date as prev date
    prevDate = currentDate;
  });

  // Result
  return {
    groupedAggregatedImpressions,
    groupedAggregatedClicks,
    allFilteredDates,
  };
};
