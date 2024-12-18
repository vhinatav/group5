
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
        width = 1000;
        height = 400;
    }
  
    return { width, height };
}
  
// Function to create and render the bar chart
function renderChart() {
    const { width, height } = getChartDimensions(); // Get the dimensions based on screen size
    
    // Load CSV data using D3.js
    d3.csv('./data/vis1-1.csv').then(data => {
        // Parse the 'temp' field as numbers
        data.forEach(d => {
            d.co2 = +d.co2;  // Ensure 'temp' is a number
        });
    
        // Define Vega-Lite spec
        const spec = {
            $schema: "https://vega.github.io/schema/vega-lite/v5.json",
            description: "CO2 Emissions by Year", // Update the description for clarity
            data: { values: data },  // Use the loaded CSV data
            mark: "bar",
            encoding: {
                y: { 
                    field: "co2", 
                    type: "quantitative", 
                    title: "CO2 Emission (in billion metric tons)",
                    axis: {
                        labels: true,
                        labelColor: "#424242",  // Axis label color (dark gray)
                    },
                    scale: { domain: [0, 40] } // Set y-axis domain range
                },
                x: { 
                    field: "year", 
                    type: "ordinal", 
                    title: "Year", 
                    axis: { 
                        labelAngle: 0,
                        labelColor: "#424242",  // Axis label color (dark gray)
                    }
                },


                color: {
                    // Set color for bars and apply hover interaction
                    condition: {
                        selection: "hover", // Only apply color change on hover
                        value: "#806A65"  // Color for hovered bars
                    },
                    value: "#4E342E"  // Default color for bars
                },
                tooltip: [ // Add tooltip interaction
                    { field: "year", title: "Year" },
                    { field: "co2", title: "CO2 Emission (BMT)" }
                ]
            },
            background: "#D7CCC8",  // Background color
            //border: "2px solid #000000",  // Border around the graph (black, 2px thick)
            width: width,  // Dynamic width
            height: height, // Dynamic height
            selection: {
                hover: {
                    type: "single", // "single" means only one bar can be hovered at a time
                    on: "mouseover", // Trigger on mouseover
                    encodings: ["x"], // Apply to the x-axis (bars)
                    empty: "none", // Make sure that nothing is selected when the mouse is not over any bar
                    clear: "mouseout" // Clear selection when mouse leaves
                }
            },
            config: {
                axis: {
                    titleColor: "#424242",  // Axis title color (black)
                    labelFontSize: 10,       // Font size for axis labels
                    titleFontSize: 12,       // Font size for axis titles
                    labelColor: "#424242",   // Axis label color (dark gray)
                },
                view: {
                    stroke: "#D7CCC8"  // Border color of the chart's framing (black)
                }
            },
            title: {
                text: "Increased Worldwide CO2 Emissions", // Set the title text
                fontSize: 15,  // Set font size for the title
                //fontWeight: "bold",  // Make the title bold
                color: "#424242",  // Set title color (black)
                anchor: "middle",  // Title alignment (centered)
                font: "DM Sans",  // Font style
                dy: -10  // Adjust vertical position of the title (slightly above the chart)
            }
        };
    
        // Clear any existing chart and render the new one
        document.getElementById('vis1-1').innerHTML = '';
        vegaEmbed('#vis1-1', spec).catch(console.error);
    });
}

// Initial rendering of the chart
renderChart();

// Redraw the chart on window resize
window.addEventListener('resize', renderChart);
