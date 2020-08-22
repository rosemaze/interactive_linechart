import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import { YAxes } from "../../App.types";

interface Props {
  xAxisDates: Date[];
  yAxisClicks: number[];
  yAxisImpressions: number[];
}

export const ClicksImpressionsChart: React.FC<Props> = (props) => {
  const { xAxisDates, yAxisClicks } = props;

  // Calculate max and min ticks

  return (
    <LineChart
      type="line"
      data={{
        labels: xAxisDates,
        datasets: [
          {
            label: "Clicks",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: yAxisClicks,
            yAxisID: YAxes.Clicks,
          },
          {
            label: "Impressions",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [444, 399, 425, 880],
            yAxisID: YAxes.Impressions,
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
              ticks: {
                max: 20,
                min: 0,
              },
            },
            {
              id: YAxes.Impressions,
              type: "linear",
              position: "right",
              ticks: {
                max: 500,
                min: 100,
              },
            },
          ],
        },
      }}
    />
  );
};
