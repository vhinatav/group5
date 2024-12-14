// PREPARATION
// 1: Add <script src="https://d3js.org/d3.v7.min.js"></script> to hmtl
// 2: Add <script src="vis1.js"></script> to html

// Set up the chart dimensions and margins
const margin = { top: 50, right: 100, bottom: 50, left: 60 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("#section1")  // Target the section1 element
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip setup
const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "#f9f9f9")
    .style("border", "1px solid #d3d3d3")
    .style("padding", "8px")
    .style("display", "none")
    .style("pointer-events", "none");

// Define datasets
const temperatureData = [
    { year: 1950, value: -0.12 },
    { year: 1955, value: -0.13 },
    { year: 1960, value: 0.03 },
    { year: 1965, value: -0.06 },
    { year: 1970, value: 0.06 },
    { year: 1975, value: 0.02 },
    { year: 1980, value: 0.29 },
    { year: 1985, value: 0.17 },
    { year: 1990, value: 0.45 },
    { year: 1995, value: 0.48 },
    { year: 2000, value: 0.43 },
    { year: 2005, value: 0.70 },
    { year: 2010, value: 0.73 },
    { year: 2015, value: 0.91 },
    { year: 2020, value: 1.02 },
    { year: 2023, value: 1.19 }
];

const co2Data = [
    { year: 1950, value: 5.93 },
    { year: 1955, value: 7.44 },
    { year: 1960, value: 9.39 },
    { year: 1965, value: 11.31 },
    { year: 1970, value: 14.90 },
    { year: 1975, value: 17.05 },
    { year: 1980, value: 19.48 },
    { year: 1985, value: 20.31 },
    { year: 1990, value: 22.52 },
    { year: 1995, value: 23.27 },
    { year: 2000, value: 25.20 },
    { year: 2005, value: 29.21 },
    { year: 2010, value: 32.81 },
    { year: 2015, value: 34.72 },
    { year: 2020, value: 34.37 },
    { year: 2023, value: 37.01 },
];

// Combine datasets for shared x-axis
const allYears = Array.from(new Set([
    ...temperatureData.map(d => d.year),
    ...co2Data.map(d => d.year)
]));

// Scales
const x = d3.scaleLinear()
    .domain(d3.extent(allYears))
    .range([0, width]);

const y1 = d3.scaleLinear()
    .domain(d3.extent(temperatureData, d => d.value))
    .range([height, 0]);

const y2 = d3.scaleLinear()
    .domain(d3.extent(co2Data, d => d.value))
    .range([height, 0]);

// Axes
const xAxis = d3.axisBottom(x).tickFormat(d3.format("d"));
const yAxisLeft = d3.axisLeft(y1);
const yAxisRight = d3.axisRight(y2);

// Draw axes
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

svg.append("g")
    .call(yAxisLeft);

svg.append("g")
    .attr("transform", `translate(${width},0)`)
    .call(yAxisRight);

// Line generators
const lineTemperature = d3.line()
    .x(d => x(d.year))
    .y(d => y1(d.value));

const lineCO2 = d3.line()
    .x(d => x(d.year))
    .y(d => y2(d.value));

// Function to animate the lines
function animateLines() {
    temperaturePath
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
        .transition()
        .duration(3000)
        .attr("stroke-dashoffset", 0);

    co2Path
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
        .transition()
        .duration(3000)
        .attr("stroke-dashoffset", 0);
}

// Draw temperature line
const temperaturePath = svg.append("path")
    .datum(temperatureData)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 1.5)
    .attr("d", lineTemperature);

// Draw CO2 line
const co2Path = svg.append("path")
    .datum(co2Data)
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .attr("d", lineCO2);

// Add temperature points.
svg.selectAll(".temp-point")
    .data(temperatureData)
    .enter()
    .append("circle")
    .attr("class", "temp-point")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y1(d.value))
    .attr("r", 4)
    .attr("fill", "grey")
    .on("mouseover", function(event, d) {
        tooltip.style("display", "block")
            .html(`Year: ${d.year}<br>Temp Anomaly: ${d.value.toFixed(2)}°C`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", () => tooltip.style("display", "none"));

// Add CO2 points
svg.selectAll(".co2-point")
    .data(co2Data)
    .enter()
    .append("circle")
    .attr("class", "co2-point")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y2(d.value))
    .attr("r", 4)
    .attr("fill", "white")
    .on("mouseover", function(event, d) {
        tooltip.style("display", "block")
            .html(`Year: ${d.year}<br>CO₂ Emissions: ${d.value.toFixed(2)} BMT`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    })
    .on("mouseout", () => tooltip.style("display", "none"));

// Add labels
svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .text("Year");

svg.append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Temperature Anomalies (°C)");

svg.append("text")
    .attr("x", height / 2)
    .attr("y", width + margin.right - 20)
    .attr("transform", `rotate(90)`)
    .attr("text-anchor", "middle")
    .text("CO₂ Emissions (Billion Metric Tons)");

// Add legend
const legend = svg.append("g")
    .attr("transform", `translate(${width - 200},${margin.top})`);

legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "grey");

legend.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text("Temperature Anomalies");

legend.append("rect")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "white");

legend.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .text("CO₂ Emissions");

// Replay animation on click
d3.select("svg").on("click", animateLines);

// Initial animation
animateLines();