import React from "react";
import "./App.css";
import { CsvUploader } from "./components/CsvUploader/CsvUploader";
import { CsvRow } from "./components/CsvUploader/CsvUploader.types";
import { MultiSelector } from "./components/MultiSelector/MultiSelector";
import { getDataSourceOptions } from "./helpers/getDataSourceOptions";
import { getCampaignOptions } from "./helpers/getCampaignOptions";
import { getFilteredData } from "./helpers/getFilteredData";
import { LeftPane } from "./styles/LeftPane.style";
import { RightPane } from "./styles/RightPane.style";
import { DashboardWrapper } from "./styles/DashboardWrapper.style";
import { ValueType } from "react-select";
import {
  SelectOption,
  SELECT_ALL_OPTION,
} from "./components/MultiSelector/MultiSelector.types";
import { ClicksImpressionsChart } from "./components/ClicksImpressionsChart/ClicksImpressionsChart";
import { Label } from "./styles/Label.style";
import { Title } from "./styles/Title.style";
import { getAggregatedClicksAndImpressions } from "./helpers/getAggregatedClicksAndImpressions";

const App = () => {
  const [data, setData] = React.useState<Array<CsvRow>>();
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
  const [yAxisImpressions, setYAxisImpressions] = React.useState<Array<number>>(
    []
  );

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
    const filteredData = getFilteredData({
      datasourcesToFilter,
      campaignsToFilter,
      data,
    });

    // Get x axis and y axis values based on aggregated clicks and impressions on filtered data
    const aggregatedClicksAndImpressionsBasedOnFilters = getAggregatedClicksAndImpressions(
      {
        filteredData,
      }
    );

    setXAxisDates(
      aggregatedClicksAndImpressionsBasedOnFilters.allFilteredDates
    );
    setYAxisClicks(
      aggregatedClicksAndImpressionsBasedOnFilters.groupedAggregatedClicks
    );
    setYAxisImpressions(
      aggregatedClicksAndImpressionsBasedOnFilters.groupedAggregatedImpressions
    );

    console.log({ aggregatedClicksAndImpressionsBasedOnFilters });
  }, [
    selectedDatasources,
    selectedCampaigns,
    data,
    setXAxisDates,
    setYAxisClicks,
    setYAxisImpressions,
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
          <Title>Filter dimension values</Title>
          <Label>Datasources</Label>
          <MultiSelector
            options={datasources}
            selectedOptions={selectedDatasources}
            onHandleChange={setSelectedDataSources}
          />
          <Label>Campaigns</Label>
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
            yAxisImpressions={yAxisImpressions}
          />
        </RightPane>
      </DashboardWrapper>

      <CsvUploader onDrop={handleOnDrop} />
    </>
  );
};

export default App;
