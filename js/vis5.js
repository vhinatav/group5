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
        height = 300;
    } else {
        // For large screens (desktop)
        width = 500;
        height = 350;
    }

    return { width, height };
}

// Function to create and render the heatmap
function renderHeatmap() {
    const { width, height } = getChartDimensions(); // Get dimensions based on screen size

    d3.csv('../../data/vis5.csv').then(data => {
        // Define Vega-Lite spec for the heatmap
        const spec = {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            data: { values: data },  // Use the loaded data
            mark: "rect",
            encoding: {
                x: {
                    field: "Product Category",
                    type: "nominal",
                    title: "Product Category",
                    axis: { labelAngle: 0 }
                },
                y: {
                    field: "Influence Level",
                    type: "nominal",
                    title: "Influence on Decision Making",
                    axis: { labelAngle: 0 },
                    sort: "descending"
                },
                color: {
                    field: "Social Media Usage (Hours/Day)",
                    type: "quantitative",
                    aggregate: "sum",
                    title: "Social Media Usage (Hours/Day)",
                    scale: {
                        domain: [0, 100],  
                        range: ["#ccb8f2", "#4A148C"]
                    }
                }
            },
            width: width,  // Set dynamic width
            height: height, // Set dynamic height
        };

        // Clear any existing chart and render the new one
        document.getElementById('vis5').innerHTML = '';
        vegaEmbed('#vis5', spec).catch(console.error);
    });
}

// Initial rendering of the heatmap
renderHeatmap();

// Redraw the heatmap on window resize
window.addEventListener('resize', renderHeatmap);
