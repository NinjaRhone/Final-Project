// Global objects
let data, scatterplot, barchart;
let sexFilter = [];


/**
 * Load data from CSV file asynchronously and render charts
 */
d3.csv('data/Heart_disease_statlog.csv')
    .then(_data => {
        data = _data;
        data.forEach(d => {

        });

        // Initialize scales
        const colorScale = d3.scaleOrdinal()
            .range(['red', 'blue'])
            .domain([0, 1]);

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
    if (sexFilter.length == 0) {
        scatterplot.data = data;
    } else {
        scatterplot.data = data.filter(d => sexFilter.includes(d.sex));
    }
    scatterplot.updateVis();
}