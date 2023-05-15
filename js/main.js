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

        // List of groups (here I have one group per column)
        var allGroup = ["cp", "trestbps", "chol", "thalach", "oldpeak"]

        // add the options to the button
        d3.select("#selectButton1")
            .selectAll('myOptions')
            .data(allGroup)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }) // corresponding value returned by the button


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

// When the top button is changed, run the updateChart function
d3.select("#selectButton1").on("change", function(event,d) {
    // recover the option that has been chosen
    const selectedValue1 = d3.select(this).property("value")
    // run the updateChart function with this selected option
    scatterplot.updateVis(selectedValue1)
})