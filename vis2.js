// Scroll to section function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function scrollToCalculator(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}


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

d3.csv('./files/FashionSales.csv').then(data => {
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
        mark: "circle",
        encoding: {
            x: { field: "Year", type: "ordinal", axis: { labelAngle: 0 } },
            y: { field: "Revenue", type: "quantitative", title: "Revenue (billions)" },
            color: { field: "Brand", type: "nominal", scale: { range: ["#BA68C8", "#4A148C"] } },
            size: { field: "TextileWaste", type: "quantitative", title: "Textile Waste (million kg)", scale: { range: [10, 1000] } },
            tooltip: [
                { field: "Year", type: "ordinal" },
                { field: "Brand", type: "nominal" },
                { field: "Revenue", type: "quantitative", title: "Revenue (billions)" },
                { field: "TextileWaste", type: "quantitative", title: "Textile Waste (million kg)" }
            ]
        },
        width: width,  
        height: height,
    };

    // Clear any existing chart and render the new one
    document.getElementById('fast-fashion-sales').innerHTML = '';
    vegaEmbed('#fast-fashion-sales', spec).catch(console.error);
});


}

// Initial rendering of the chart
renderChart();

// Redraw the chart on window resize
window.addEventListener('resize', renderChart);




// SOCIAL MEDIA VIS

    // Function to get chart dimensions based on screen size
    function getBarChartDimensions() {
        let width, height;

        if (window.matchMedia("(max-width: 600px)").matches) {
            // For small screens (like mobile devices)
            width = 350;
            height = 250;
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
            // For medium screens (like tablets)
            width = 600;
            height = 400;
        } else {
            // For larger screens (default)
            width = 700;
            height = 400;
        }

        return { width, height };
    }

    // Function to create and render the bar chart
    function renderBarChart() {
        const { width, height } = getBarChartDimensions(); // Get dimensions based on screen size

        d3.csv('./files/dailytimespent.csv').then(data => {
            data.forEach(d => {
                d.time = +d.time;
            });

            const platformSpec = {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "title": "Daily Social Media Usage (Global)",
                "data": { "values": data },
                "mark": { "type": "bar", "color": "#cca86b" },
                "width": width,  // Use dynamic width
                "height": height, // Use dynamic height
                "encoding": {
                    "x": { "field": "year", "type": "ordinal", "title": "Year", "axis": { "labelAngle": 0 } },
                    "y": { "field": "time", "type": "quantitative", "aggregate": "sum", "title": "Time Spent (in minutes)" },
                    "tooltip": { "field": "time", "type": "quantitative", "aggregate": "sum" }
                }
            };

            // Clear any existing chart and render the new one
            document.getElementById('social-media-use').innerHTML = '';
            vegaEmbed('#social-media-use', platformSpec).catch(console.error);
        });
    }

    // Initial rendering of the chart
    renderBarChart();

    // Redraw the chart on window resize
    window.addEventListener('resize', renderBarChart);



// ENVIRONMENTAL ISSUE VIS

    // Function to get chart dimensions based on screen size
    function getTextileChartDimensions() {
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
            width = 1020;
            height = 500;
        }

        return { width, height };
    }

    // Function to create and render the line chart
    function renderTextileChart() {
        const { width, height } = getTextileChartDimensions(); // Get dimensions based on screen size

        d3.csv('./files/textilewaste.csv').then(data => {
            data.forEach(d => {
                d.generation = +d.generation;
            });

            const salesByPlatformSpec = {
                "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
                "title": "Textile Waste Generation",
                "data": { "values": data },
                "mark": { 
                    "type": "line", 
                    "color": "#cca86b",
                    "point": { "filled": true, "fill": "#7b3f61" }
                },
                "width": width,  
                "height": height, // Use dynamic height
                "encoding": {
                    "x": { "field": "year", "type": "ordinal", "title": "Year", "axis": { "labelAngle": 0 } },
                    "y": { "field": "generation", "type": "quantitative", "aggregate": "sum", "title": "Amount (in tons)" },
                    "tooltip": { "field": "generation", "type": "quantitative", "aggregate": "sum" }
                }
            };

            // Clear any existing chart and render the new one
            document.getElementById('environmental-issue').innerHTML = '';
            vegaEmbed('#environmental-issue', salesByPlatformSpec).catch(console.error);
        });
    }

    // Initial rendering of the chart
    renderTextileChart();

    // Redraw the chart on window resize
    window.addEventListener('resize', renderTextileChart);