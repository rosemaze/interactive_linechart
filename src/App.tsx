import React from "react";
import "./App.css";
import { CsvUploader } from "./components/CsvUploader/CsvUploader";
import { CsvRow } from "./components/CsvUploader/CsvUploader.types";
import { MultiSelector } from "./components/MultiSelector/MultiSelector";
import { getDataSourceOptions } from "./helpers/getDataSourceOptions";
import { getCampaignOptions } from "./helpers/getCampaignOptions";
import { getFilteredData } from "./helpers/getFilteredData";
import { getUniqueDates } from "./helpers/getUniqueDates";
import { LeftPane } from "./styles/LeftPane.style";
import { RightPane } from "./styles/RightPane.style";
import { DashboardWrapper } from "./styles/DashboardWrapper.style";
import { ValueType } from "react-select";
import {
  SelectOption,
  SELECT_ALL_OPTION,
} from "./components/MultiSelector/MultiSelector.types";
import { ClicksImpressionsChart } from "./components/ClicksImpressionsChart/ClicksImpressionsChart";

const App = () => {
  const [data, setData] = React.useState<Array<CsvRow>>();
  const [filteredData, setFilteredData] = React.useState<Array<CsvRow>>();
  const [campaigns, setCampaigns] = React.useState<Array<SelectOption>>([]);
  const [datasources, setDatasources] = React.useState<Array<SelectOption>>([]);
  const [selectedDatasources, setSelectedDataSources] = React.useState<
    Array<ValueType<SelectOption>>
  >([]);
  const [selectedCampaigns, setSelectedCampaigns] = React.useState<
    Array<ValueType<SelectOption>>
  >([]);
  const [xAxisDates, setXAxisDates] = React.useState<Array<Date>>([]);
  const [yAxisClicks, setYAxisClicks] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    if (!data) {
      return;
    }

    // If Select All was selected just use the whole data set
    const datasourcesToFilter =
      selectedDatasources.length > 0 &&
      (selectedDatasources[0] as SelectOption).value === SELECT_ALL_OPTION.value
        ? [...datasources]
        : [...selectedDatasources];

    const campaignsToFilter =
      selectedCampaigns.length > 0 &&
      (selectedCampaigns[0] as SelectOption).value === SELECT_ALL_OPTION.value
        ? [...campaigns]
        : [...selectedCampaigns];

    // Filter csv rows based on selected datasources and campaigns
    const filtered = getFilteredData({
      datasourcesToFilter,
      campaignsToFilter,
      data,
    });

    setFilteredData(filtered);

    const xAxisDates = getUniqueDates(filtered);
    setXAxisDates(xAxisDates);

    setYAxisClicks(xAxisDates.map((date) => Math.random() * Math.floor(20)));

    console.log(filtered);
  }, [
    selectedDatasources,
    selectedCampaigns,
    data,
    setXAxisDates,
    datasources,
    campaigns,
  ]);

  const handleOnDrop = React.useCallback(
    (parsedData: Array<CsvRow>) => {
      setData(parsedData);

      setDatasources([SELECT_ALL_OPTION, ...getDataSourceOptions(parsedData)]);
      setCampaigns([SELECT_ALL_OPTION, ...getCampaignOptions(parsedData)]);
    },
    [setData, setDatasources, setCampaigns]
  );

  return (
    <>
      <DashboardWrapper>
        <LeftPane>
          <MultiSelector
            options={datasources}
            selectedOptions={selectedDatasources}
            onHandleChange={setSelectedDataSources}
          />
          <MultiSelector
            options={campaigns}
            selectedOptions={selectedCampaigns}
            onHandleChange={setSelectedCampaigns}
          />
        </LeftPane>
        <RightPane>
          <ClicksImpressionsChart
            xAxisDates={xAxisDates}
            yAxisClicks={yAxisClicks}
            yAxisImpressions={[]}
          />
        </RightPane>
      </DashboardWrapper>

      <CsvUploader onDrop={handleOnDrop} />
    </>
  );
};

export default App;

/*React.useEffect(() => {
    async function getData() {
      const response = await fetch("/data/data.csv");

      if (!response || !response.body) {
        return;
      }

      const reader = response.body.getReader();
      const result = await reader.read(); // raw array

      console.log(result);
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value); // the csv text

      console.log(csv);
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      // setRows(rows);
      console.log(rows);
    }
    getData();
  }, []);
  */
