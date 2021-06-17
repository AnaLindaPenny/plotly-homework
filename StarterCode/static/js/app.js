function plotCreator(id) {
  d3.json("samples.json").then((data)=> {
      console.log(data);

      var samples = data.samples.filter(s => s.id.toString() === id)[0];
      console.log(`Samples: ${samples}`);

      var topTen = samples.sample_values.slice(0, 10).reverse();
      console.log(`Top Ten Samples: ${topTen}`);

      var topOTU = (samples.otu_ids.slice(0, 10)).reverse();
      console.log(`Top Ten OTUs: ${topOTU}`);

      var OTUids = topOTU.map(d => "OTU " + d)
      console.log(`OTU IDS: ${OTUids}`);

      var OTUlabels = samples.otu_labels.slice(0, 10);
      console.log(`Labels: ${OTUlabels}`);

      var bubbleX = samples.otu_ids;
      console.log(bubbleX);

      var bubbleY = samples.sample_values;
      console.log(bubbleY);

      var bubbleSize = samples.sample_values;
      console.log(bubbleSize);

      var bubbleColor = samples.otu_ids;
      console.log(bubbleColor);

      var bubbleText = samples.otu_labels;
      console.log(bubbleText);

      
      //Bar graph for Top 10 OTU
      var traceBar = {
          x: topTen,
          y: OTUids,
          text: OTUlabels,
          type:"bar",
          orientation: "h",
      };

      var dataBar = [traceBar];

      var layoutBar = {
          title: "Top 10 Bacteria Cultures Found",
          yaxis:{
              tickmode:"linear",
          }
      };

      Plotly.newPlot("bar", dataBar, layoutBar);
      
      //Bubble chart 
      var traceBubble = {
          x: bubbleX,
          y: bubbleY,
          mode: "markers",
          marker: {
              size: bubbleSize,
              color: bubbleColor
          },
          text:bubbleText
      };

      var layoutBubble = {
          title: "Bacteria Cultures Per Sample",
          xaxis:{title: "OTU ID"},
      };

      var dataBubble = [traceBubble];

      Plotly.newPlot("bubble", dataBubble, layoutBubble); 

  });    
}
  
function dataImporter(id) {
  d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata)

      var result = metadata.filter(meta => meta.id.toString() === id)[0];

      var demographicInfo = d3.select("#sample-metadata");
      demographicInfo.html("");

      Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
      });
  });
}

function dataSelector(id) {
  plotCreator(id);
  dataImporter(id);
}

function init() {
  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then((data)=> {
      console.log(data)

      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      plotCreator(data.names[0]);
      dataImporter(data.names[0]);
  }); 
}

init();