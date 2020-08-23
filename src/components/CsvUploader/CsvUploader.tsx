import React from "react";
import { CSVReader } from "react-papaparse";
import { CsvRow } from "./CsvUploader.types";

interface Props {
  onDrop: (data: Array<CsvRow>) => void;
}

export const CsvUploader: React.FC<Props> = (props) => {
  const handleOnDrop = React.useCallback((data: any) => {
    const csvRows: Array<CsvRow> = data.map((row: any) => {
      return {
        date: row.data[0],
        dataSource: row.data[1],
        campaign: row.data[2],
        clicks: (row.data[3] && parseInt(row.data[3])) || 0, // Handle undefined values
        impressions: (row.data[4] && parseInt(row.data[4])) || 0,
      };
    });

    // Remove header
    csvRows.shift();

    props.onDrop(csvRows);
  }, []);

  const handleOnError = React.useCallback((err, file, inputElem, reason) => {
    console.log(err);
  }, []);

  const handleOnRemoveFile = (data: any) => {
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      noClick
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
    >
      <span>Drop CSV file here to upload.</span>
    </CSVReader>
  );
};
