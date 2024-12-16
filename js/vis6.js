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
      width = 600;
      height = 400;
    }
  
    return { width, height };
  }
  
  // Function to create and render the area chart
  function renderAreaChart() {
    const { width, height } = getChartDimensions(); // Get the dimensions based on screen size
  
    // Load the data from the CSV file
    d3.csv('/data/vis6.csv').then(data => {
      // Parse the 'time' column as a number if necessary
      data.forEach(d => {
        d.time = +d.time; // Ensure time is a number
        d.year = d.year; // Assuming 'year' is already a valid field
      });
  
      // Define the Vega-Lite spec
      const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Social Media Use over Time",
        data: { values: data },  // Use the loaded CSV data
        mark: "area",
        encoding: {
          x: { field: "year", type: "ordinal", axis: { labelAngle: 0, grid: true } },
          y: { field: "time", type: "quantitative", aggregate: "sum", title: "Minutes Per Day", scale: { domain: [85, 160] } },
          color: { value: "#9a6cf0" },
          opacity: { value: 0.65 }
        },
        title: "Social Media Use",
        width: width,  // Set the width dynamically
        height: height,  // Set the height dynamically
      };
  
      // Render the chart using the Vega-Lite spec
      vegaEmbed('#vis6', spec).catch(console.error);  // Assuming you have an element with id="pie-chart"
    });
  }
  
  // Call the function to render the chart
  renderAreaChart();
  
  // Redraw the chart on window resize
  window.addEventListener('resize', renderAreaChart);