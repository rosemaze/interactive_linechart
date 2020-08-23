This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Drop a CSV file in to the upload area below the dashboard. The CSV file must be of the data specifications stated below.

<img src="https://github.com/rosemaze/interactive_linechart/blob/master/src/data/images/screenshot.png" />

### Description of Project

This project is an implementation of an interactive dashboard that displays a plotted line chart based on data uploaded via a CSV file.

### Data Specification

The data structure must look like this:

- `Date` (string in format `dd.mm.yyyy`)
- `Data` source (string)
- `Campaign` (string)
- `Clicks` (numeric string or `undefined`)
- `Impressions` (numeric string or `undefined`)

Processing the data

1. Parse data from CSV file based on above structure
2. Filter data based on selected Datasources and campaigns
3. Group data based on date
4. Accumulate the values of Clicks and Impressions based on date
   The `getAggregatedClicksAndImpressions` function works on a vital assumption - the data in the CSV file has already been sorted by date. Otherwise we could also pre-sort the data after step 1. but I haven't implemented this here.

### Interactive Filters for the chart

The user can chose the data they wish to display on the chart based on two filters, Data sources and Campaigns.
They can also use 'Select All' to use all options on either filters.

### Tech used

Libraries

- `react-chartjs-2`
  Used to display the data plotted on a linechart

- `react-select`
  Used for the multi selectable filters

- `react-papaparse`
  Used to read and parse the data from the uploaded CSV file
