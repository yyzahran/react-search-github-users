// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({ data }) => {
    // STEP 3 - Creating the JSON object to store the chart configurations
    const chartConfigs = {
        type: "Doughnut2d", // The chart type
        width: "400", // Width of the chart
        height: "400", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                caption: "Stars Per Language",
                decimals: 0,
                pieRadius: "45%",
                showPercentValues: 0,
                theme: 'candy',
            },
            // Chart Data
            data: data,
        }
    };

    return (<ReactFC {...chartConfigs} />);
};

export default Doughnut2d;
