import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import { YAxes } from "../../App.types";
import { Placeholder } from "./styles/Placeholder.style";
import { ChartWrapper } from "./styles/ChartWrapper.style";

interface Props {
  xAxisDates: Date[];
  yAxisClicks: number[];
  yAxisImpressions: number[];
}

export const ClicksImpressionsChart: React.FC<Props> = (props) => {
  const { xAxisDates, yAxisClicks, yAxisImpressions } = props;

  // Calculate max and min ticks
  const clicksTicks = {
    max: Math.max(...yAxisClicks),
    min: Math.min(...yAxisClicks),
  };
  const impressionsTicks = {
    max: Math.max(...yAxisImpressions),
    min: Math.min(...yAxisImpressions),
  };

  const noDataToPlot =
    xAxisDates.length === 0 ||
    (yAxisClicks.length === 0 && yAxisImpressions.length === 0);

  return (
    <ChartWrapper>
      {noDataToPlot && (
        <Placeholder>
          <div>No data to display for the selected filters</div>
        </Placeholder>
      )}
      <LineChart
        type="line"
        data={{
          labels: xAxisDates,
          datasets: [
            {
              yAxisID: YAxes.Clicks,
              label: "Clicks",
              data: yAxisClicks,
              borderColor: "#fc6d95",
              fill: true,
              backgroundColor: "rgba(252, 109, 149, 0.2)",
            },
            {
              yAxisID: YAxes.Impressions,
              label: "Impressions",
              data: yAxisImpressions,
              borderColor: "#0cb3fa",
              fill: true,
              backgroundColor: "rgba(12, 179, 250, 0.2)",
            },
          ],
        }}
        options={{
          fill: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    quarter: "MMM YYYY",
                  },
                },
                distribution: "linear",
              },
            ],
            yAxes: [
              {
                id: YAxes.Clicks,
                type: "linear",
                position: "left",
                ticks: clicksTicks,
                scaleLabel: {
                  display: true,
                  labelString: "Clicks",
                },
              },
              {
                id: YAxes.Impressions,
                type: "linear",
                position: "right",
                ticks: impressionsTicks,
                scaleLabel: {
                  display: true,
                  labelString: "Impressions",
                },
              },
            ],
          },
        }}
      />
    </ChartWrapper>
  );
};
