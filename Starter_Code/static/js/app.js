// Build the metadata panel
// Function below was written using Eli/instructor's code that was given during class
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("called buildMetadata", sample);
    // get the metadata field
    let metadata = data["metadata"];

    // Filter the metadata for the object with the desired sample number
    let buildMetadataresult= metadata.filter(x=>x.id==sample);
    let results=buildMetadataresult[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel= d3.select("#sample-metadata");
  

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new

    // tags for each key-value in the filtered metadata.
    for (x in results) {
      panel.append("h6").text(`${x}: ${results[x]}`)
    }

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let samples = data["samples"];

    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(x => x.id == sample);
    let result = sampleData[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result["otu_ids"];
    let otu_labels = result["otu_labels"];
    let sample_values = result["sample_values"];

    // Build a Bubble Chart
    var layout = {
      title: 'Bacterias per Sample',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis:{title:'OTU ID'},
      yaxis: {title:'Number of Bacteria'}
    };

    var bubblechart = [{
      x: otu_ids,
      y: sample_values,
      type: 'scatter',
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubblechart, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // code written with help from chatgpt and Plotly.com
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    let barValues = sample_values.slice(0, 10).reverse();
    let barLabels = otu_labels.slice(0, 10).reverse();

    var barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      yaxis: { title: 'OTU ID' }
    };

    var barchart = [{
      x: barValues,
      y: yticks,
      text: barLabels,
      type: 'bar',
      orientation: 'h'
    }];

    // Render the Bar Chart
    Plotly.newPlot('bar', barchart, barLayout);
  });
}

// Function to run on page load
// code written with help from tutor
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names= data["names"];

    // Use d3 to select the dropdown with id of `#selDataset`
    let selectdata= d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (n in names) {
      selectdata.append("option").text(names[n]).property("value",names[n])
    };

    // Get the first sample from the list
    let firstsample=names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstsample)

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildMetadata(newSample);
buildCharts(newSample);
}

// Initialize the dashboard
init();
