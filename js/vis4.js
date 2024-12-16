// Function to get chart dimensions based on screen size
function getChartDimensions() {
    let width, height;

    if (window.matchMedia("(max-width: 600px)").matches) {
        // For small screens (mobile)
        width = 300;
        height = 250;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
        // For medium screens (tablet)
        width = 500;
        height = 400;
    } else {
        // For large screens (desktop)
        width = 450;
        height = 350;
    }

    return { width, height };
}

// Function to create and render the chart
function renderChart() {
    const { width, height } = getChartDimensions(); // Get dimensions based on screen size

    d3.csv('../data/vis4.csv').then(data => {
        // Filter the data for 'Fashion' Product Category
        const filteredData = data.filter(d => d['Product Category'] === 'Fashion');

        // Define Vega-Lite spec
        const spec = {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            description: "Social Media Usage and Influence on Purchasing Fashion Products",
            data: { values: filteredData },  // Use filtered data
            mark: "arc",
            encoding: {
                theta: {
                    field: "Social Media Usage (Hours/Day)",
                    type: "quantitative",
                    aggregate: "sum"
                },
                color: {
                    field: "Influence Level",
                    type: "nominal",
                    scale: { range: ["#cebbf2", "#9a6cf0"] }
                }
            },
            width: width,   // Set dynamic width
            height: height, // Set dynamic height
            title: "Social Media Usage and Influence Level on Purchasing Fashion Products"
        };

        // Render the chart in the specified div with id 'pie-chart'
        vegaEmbed('#vis4', spec).catch(console.error);
    });
}

// Initial rendering of the chart
renderChart();

// Redraw the chart on window resize
window.addEventListener('resize', renderChart);
