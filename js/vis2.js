

// FAST FASHION VIS

// Function to get chart dimensions based on screen size
function getChartDimensions() {
    let width, height;

    if (window.matchMedia("(max-width: 600px)").matches) {
        // For small screens 
        width = 300;
        height = 250;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
        // For medium screens 
        width = 600;
        height = 400;
    } else {
        // For larger screens 
        width = 900;
        height = 500;
    }

    return { width, height };
}

// Function to create and render the chart
function renderChart() {
    const { width, height } = getChartDimensions(); // Get the dimensions based on screen size

    d3.csv('./data/vis2.csv').then(data => {
        // Parse revenue and textile waste as numbers
        data.forEach(d => {
            d.Revenue = +d.Revenue;  // Ensure Revenue is a number
            d.TextileWaste = +d.TextileWaste;  // Ensure TextileWaste is a number
        });

        // Define Vega-Lite spec
        const spec = {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            description: "Fashion Sales vs Textile Waste",
            data: { values: data },  // Use the loaded data
            layer: [

                {
                    mark: "circle",  // Keep the circles as markers for each data point
                    encoding: {
                        x: { field: "Year", type: "ordinal" },
                        y: { field: "Revenue", type: "quantitative" },
                        color: { field: "Brand", type: "nominal", scale: { range: ["#BA68C8", "#4A148C"] } },
                        size: { field: "TextileWaste", type: "quantitative", title: "Textile Waste (million kg)", scale: { range: [10, 1000] } },
                        fill: { field: "Brand", type: "nominal", scale: { range: ["#BA68C8", "#4A148C"] } }, 
                        fillOpacity: { value: 1 },
                        
                        tooltip: [
                            { field: "Year", type: "ordinal" },
                            { field: "Brand", type: "nominal" },
                            { field: "Revenue", type: "quantitative", title: "Revenue (billions)" },
                            { field: "TextileWaste", type: "quantitative", title: "Textile Waste (million kg)" }
                        ]
                    }
                },
                {
                    mark: "line",  // Create lines connecting the points
                    encoding: {
                        x: { field: "Year", type: "ordinal", axis: { labelAngle: 0 } },
                        y: { field: "Revenue", type: "quantitative", title: "Revenue (billions)" },
                        color: { 
                            field: "Brand", 
                            type: "nominal", 
                            scale: { range: ["#BA68C8", "#4A148C"] },
                            legend: null  // Disable the legend for the line
                        },
                        opacity: { value: 0.4 }
                    }
                }

            ],
            width: width,  
            height: height,
        };

        // Clear any existing chart and render the new one
        document.getElementById('vis2').innerHTML = '';  // Clear the previous chart
        vegaEmbed('#vis2', spec).catch(console.error);    // Embed the new chart
    });
}

// Initial rendering of the chart
renderChart();

// Redraw the chart on window resize
window.addEventListener('resize', renderChart);
