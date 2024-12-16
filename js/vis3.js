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
      width = 600;
      height = 400;
  }

  return { width, height };
}


// Function to create and render the bar chart
function renderChart() {
    const { width, height } = getChartDimensions(); // Get the dimensions based on screen size
  
    // Load CSV data using D3.js
    d3.csv('../../data/vis3.csv').then(data => {
      // Parse the 'time_spent' field as numbers
      data.forEach(d => {
        d.time_spent = +d.time_spent;  // Ensure 'time_spent' is a number
      });
  
      // Define Vega-Lite spec
      const spec = {
        $schema: "https://vega.github.io/schema/vega-lite/v5.json",
        description: "Daily Time Spent on Social Media",
        data: { values: data },  // Use the loaded CSV data
        mark: "bar",
        encoding: {
          y: { 
            field: "time_spent", 
            type: "quantitative", 
            title: "Average Time Spent",
            aggregate: "sum",
            axis: {
              labels: true
            },
            scale: { domain: [1400, 2000] } // Set y-axis domain range
          },
          x: { 
            field: "platform", 
            type: "ordinal", 
            title: "Platform", 
            axis: { labelAngle: 0 }
          },
          color: { 
            field: "platform", 
            type: "nominal", 
            scale: { range: ["#4A148C"] },
            legend: null // This removes the color guide
          }
        },
        width: width,  // Dynamic width
        height: height, // Dynamic height
      };
  
      // Clear any existing chart and render the new one
      document.getElementById('vis3').innerHTML = '';
      vegaEmbed('#vis3', spec).catch(console.error);
    });
  }
  
  // Initial rendering of the chart
  renderChart();
  
  // Redraw the chart on window resize
  window.addEventListener('resize', renderChart);
