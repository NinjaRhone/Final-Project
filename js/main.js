// Global objects
let data, scatterplot, barchart;
let regionFilter = [];


/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/africa.csv')
    .then(_data => {
        data = _data;
        data.forEach(d => {
            d.SurfaceArea = +d.SurfaceArea;
            d.Population = +d.Population;
            d.PopDensity = +d.PopDensity;
            d.SexRatio = +d.SexRatio;
        });

        // Initialize scales
        const colorScale = d3.scaleOrdinal()
            .range(['red', 'blue', 'green', 'black', 'purple'])
            .domain(['NorthernAfrica', 'MiddleAfrica', 'WesternAfrica', 'SouthernAfrica', 'CentralAsia']);

        scatterplot = new Scatterplot({
            parentElement: '#scatterplot',
            colorScale: colorScale
        }, data);
        scatterplot.updateVis();

        barchart = new Barchart({
            parentElement: '#barchart',
            colorScale: colorScale
        }, data);
        barchart.updateVis();

    })
    .catch(error => console.error(error));


/**
 * Use bar chart as filter and update scatter plot accordingly
 */
function filterData() {
    if (regionFilter.length == 0) {
        scatterplot.data = data;
    } else {
        scatterplot.data = data.filter(d => regionFilter.includes(d.region));
    }
    scatterplot.updateVis();
}