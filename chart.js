// Set up the chart dimensions and margins
const margin = { top: 50, right: 100, bottom: 50, left: 60 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("body")
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
    // { year: 1880, value: -0.17 },
    // { year: 1881, value: -0.13 },
    // { year: 1882, value: -0.12 },
    // { year: 1883, value: -0.22 },
    // { year: 1884, value: -0.31 },
    // { year: 1885, value: -0.33 },
    // { year: 1886, value: -0.26 },
    // { year: 1887, value: -0.31 },
    // { year: 1888, value: -0.17 },
    // { year: 1889, value: -0.08 },
    // { year: 1890, value: -0.28 },
    // { year: 1891, value: -0.19 },
    // { year: 1892, value: -0.26 },
    // { year: 1893, value: -0.32 },
    // { year: 1894, value: -0.23 },
    // { year: 1895, value: -0.19 },
    // { year: 1896, value: -0.06 },
    // { year: 1897, value: -0.07 },
    // { year: 1898, value: -0.23 },
    // { year: 1899, value: -0.16 },
    // { year: 1900, value: -0.09 },
    // { year: 1901, value: -0.13 },
    // { year: 1902, value: -0.23 },
    // { year: 1903, value: -0.32 },
    // { year: 1904, value: -0.43 },
    // { year: 1905, value: -0.24 },
    // { year: 1906, value: -0.21 },
    // { year: 1907, value: -0.33 },
    // { year: 1908, value: -0.40 },
    // { year: 1909, value: -0.44 },
    // { year: 1910, value: -0.40 },
    // { year: 1911, value: -0.41 },
    // { year: 1912, value: -0.33 },
    // { year: 1913, value: -0.33 },
    // { year: 1914, value: -0.15 },
    // { year: 1915, value: -0.10 },
    // { year: 1916, value: -0.32 },
    // { year: 1917, value: -0.44 },
    // { year: 1918, value: -0.29 },
    // { year: 1919, value: -0.24 },
    // { year: 1920, value: -0.25 },
    // { year: 1921, value: -0.18 },
    // { year: 1922, value: -0.25 },
    // { year: 1923, value: -0.24 },
    // { year: 1924, value: -0.23 },
    // { year: 1925, value: -0.20 },
    // { year: 1926, value: -0.09 },
    // { year: 1927, value: -0.18 },
    // { year: 1928, value: -0.17 },
    // { year: 1929, value: -0.31 },
    // { year: 1930, value: -0.11 },
    // { year: 1931, value: -0.06 },
    // { year: 1932, value: -0.12 },
    // { year: 1933, value: -0.25 },
    // { year: 1934, value: -0.11 },
    // { year: 1935, value: -0.16 },
    // { year: 1936, value: -0.12 },
    // { year: 1937, value: 0.01 },
    // { year: 1938, value: 0.01 },
    // { year: 1939, value: 0.01 },
    // { year: 1940, value: 0.16 },
    // { year: 1941, value: 0.22 },
    // { year: 1942, value: 0.09 },
    // { year: 1943, value: 0.10 },
    // { year: 1944, value: 0.23 },
    // { year: 1945, value: 0.14 },
    // { year: 1946, value: -0.04 },
    // { year: 1947, value: -0.01 },
    // { year: 1948, value: -0.06 },
    // { year: 1949, value: -0.06 },
    { year: 1950, value: -0.12 },
    // { year: 1951, value: -0.01 },
    // { year: 1952, value: 0.05 },
    // { year: 1953, value: 0.13 },
    // { year: 1954, value: -0.07 },
    { year: 1955, value: -0.13 },
    // { year: 1956, value: -0.17 },
    // { year: 1957, value: 0.06 },
    // { year: 1958, value: 0.08 },
    // { year: 1959, value: 0.07 },
    { year: 1960, value: 0.03 },
    // { year: 1961, value: 0.07 },
    // { year: 1962, value: 0.05 },
    // { year: 1963, value: 0.08 },
    // { year: 1964, value: -0.15 },
    { year: 1965, value: -0.06 },
    // { year: 1966, value: -0.02 },
    // { year: 1967, value: 0.01 },
    // { year: 1968, value: -0.06 },
    // { year: 1969, value: 0.09 },
    { year: 1970, value: 0.06 },
    // { year: 1971, value: -0.05 },
    // { year: 1972, value: 0.03 },
    // { year: 1973, value: 0.20 },
    // { year: 1974, value: -0.05 },
    { year: 1975, value: 0.02 },
    // { year: 1976, value: -0.03 },
    // { year: 1977, value: 0.21 },
    // { year: 1978, value: 0.11 },
    // { year: 1979, value: 0.22 },
    { year: 1980, value: 0.29 },
    // { year: 1981, value: 0.35 },
    // { year: 1982, value: 0.19 },
    // { year: 1983, value: 0.35 },
    // { year: 1984, value: 0.20 },
    { year: 1985, value: 0.17 },
    // { year: 1986, value: 0.21 },
    // { year: 1987, value: 0.34 },
    // { year: 1988, value: 0.42 },
    // { year: 1989, value: 0.31 },
    { year: 1990, value: 0.45 },
    // { year: 1991, value: 0.42 },
    // { year: 1992, value: 0.23 },
    // { year: 1993, value: 0.27 },
    // { year: 1994, value: 0.32 },
    { year: 1995, value: 0.48 },
    // { year: 1996, value: 0.36 },
    // { year: 1997, value: 0.50 },
    // { year: 1998, value: 0.63 },
    // { year: 1999, value: 0.42 },
    { year: 2000, value: 0.43 },
    // { year: 2001, value: 0.55 },
    // { year: 2002, value: 0.62 },
    // { year: 2003, value: 0.63 },
    // { year: 2004, value: 0.55 },
    { year: 2005, value: 0.70 },
    // { year: 2006, value: 0.66 },
    // { year: 2007, value: 0.66 },
    // { year: 2008, value: 0.55 },
    // { year: 2009, value: 0.66 },
    { year: 2010, value: 0.73 },
    // { year: 2011, value: 0.63 },
    // { year: 2012, value: 0.66 },
    // { year: 2013, value: 0.68 },
    // { year: 2014, value: 0.76 },
    { year: 2015, value: 0.91 },
    // { year: 2016, value: 1.03 },
    // { year: 2017, value: 0.94 },
    // { year: 2018, value: 0.87 },
    // { year: 2019, value: 0.98 },
    { year: 2020, value: 1.02 },
    // { year: 2021, value: 0.87 },
    // { year: 2022, value: 0.90 },
    { year: 2023, value: 1.19 }
];

const co2Data = [
    // { year: 1940, value: 4.86 },
    // { year: 1941, value: 4.97 },
    // { year: 1942, value: 4.96 },
    // { year: 1943, value: 5.04 },
    // { year: 1944, value: 5.12 },
    // { year: 1945, value: 4.26 },
    // { year: 1946, value: 4.65 },
    // { year: 1947, value: 5.15 },
    // { year: 1948, value: 5.42 },
    // { year: 1949, value: 5.18 },
    { year: 1950, value: 5.93 },
    // { year: 1951, value: 6.38 },
    // { year: 1952, value: 6.47 },
    // { year: 1953, value: 6.65 },
    // { year: 1954, value: 6.79 },
    { year: 1955, value: 7.44 },
    // { year: 1956, value: 7.93 },
    // { year: 1957, value: 8.19 },
    // { year: 1958, value: 8.42 },
    // { year: 1959, value: 8.85 },
    { year: 1960, value: 9.39 },
    // { year: 1961, value: 9.41 },
    // { year: 1962, value: 9.75 },
    // { year: 1963, value: 10.27 },
    // { year: 1964, value: 10.82 },
    { year: 1965, value: 11.31 },
    // { year: 1966, value: 11.86 },
    // { year: 1967, value: 12.24 },
    // { year: 1968, value: 12.90 },
    // { year: 1969, value: 13.76 },
    { year: 1970, value: 14.90 },
    // { year: 1971, value: 15.50 },
    // { year: 1972, value: 16.22 },
    // { year: 1973, value: 17.08 },
    // { year: 1974, value: 17.01 },
    { year: 1975, value: 17.05 },
    // { year: 1976, value: 17.99 },
    // { year: 1977, value: 18.49 },
    // { year: 1978, value: 19.06 },
    // { year: 1979, value: 19.60 },
    { year: 1980, value: 19.48 },
    // { year: 1981, value: 19.02 },
    // { year: 1982, value: 18.87 },
    // { year: 1983, value: 18.99 },
    // { year: 1984, value: 19.64 },
    { year: 1985, value: 20.31 },
    // { year: 1986, value: 20.61 },
    // { year: 1987, value: 21.25 },
    // { year: 1988, value: 22.08 },
    // { year: 1989, value: 22.38 },
    { year: 1990, value: 22.52 },
    // { year: 1991, value: 22.97 },
    // { year: 1992, value: 22.31 },
    // { year: 1993, value: 22.52 },
    // { year: 1994, value: 22.74 },
    { year: 1995, value: 23.27 },
    // { year: 1996, value: 23.99 },
    // { year: 1997, value: 24.12 },
    // { year: 1998, value: 24.02 },
    // { year: 1999, value: 24.56 },
    { year: 2000, value: 25.20 },
    // { year: 2001, value: 25.39 },
    // { year: 2002, value: 25.95 },
    // { year: 2003, value: 27.31 },
    // { year: 2004, value: 28.25 },
    { year: 2005, value: 29.21 },
    // { year: 2006, value: 30.18 },
    // { year: 2007, value: 31.06 },
    // { year: 2008, value: 31.58 },
    // { year: 2009, value: 31.02 },
    { year: 2010, value: 32.81 },
    // { year: 2011, value: 33.91 },
    // { year: 2012, value: 34.38 },
    // { year: 2013, value: 34.65 },
    // { year: 2014, value: 34.77 },
    { year: 2015, value: 34.72 },
    // { year: 2016, value: 34.73 },
    // { year: 2017, value: 35.29 },
    // { year: 2018, value: 36.00 },
    // { year: 2019, value: 36.37 },
    { year: 2020, value: 34.37 },
    // { year: 2021, value: 36.20 },
    // { year: 2022, value: 36.50 },
    { year: 2023, value: 37.01 },
    //{ year: 2024, value: 37.41 }
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
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", lineTemperature);

// Draw CO2 line
const co2Path = svg.append("path")
    .datum(co2Data)
    .attr("fill", "none")
    .attr("stroke", "tomato")
    .attr("stroke-width", 1.5)
    .attr("d", lineCO2);

// Add temperature points
svg.selectAll(".temp-point")
    .data(temperatureData)
    .enter()
    .append("circle")
    .attr("class", "temp-point")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y1(d.value))
    .attr("r", 4)
    .attr("fill", "steelblue")
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
    .attr("fill", "tomato")
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
    .attr("fill", "steelblue");

legend.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text("Temperature Anomalies");

legend.append("rect")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", "tomato");

legend.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .text("CO₂ Emissions");

// Replay animation on click
d3.select("svg").on("click", animateLines);

// Initial animation
animateLines();