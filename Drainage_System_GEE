/*Accessing WWF Hydrosheds Dataset and selecting the band of interest */
var dataset = ee.Image('WWF/HydroSHEDS/15ACC');
var flowAccumulation = dataset.select('b1');
/*Setting up the parameters for visualization (styling) of the layer and filtering it for showing only values bigger than 50 (to show only bigger waterways) */
var flowAccumulationVis = {
  min: 50.0,
  max: 500.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};
/*Centring the map to my study area location and setting up the zoom level */
Map.setCenter(-78.895419, 0.022938,10);
/*Actually drawing the layer in the map*/
Map.addLayer(flowAccumulation, flowAccumulationVis, 'Flow Accumulation');
/*Drawing a rectangle around my study area */
var studyArea = ee.Geometry.Rectangle([-79.018, 0.11, -78.706, -0.08]);
/*Actually drawing the layer in the map*/
Map.addLayer(studyArea, {color:"red"}, "studyArea")
/*Referencing my study area to be the area used to clip the area of interest to export layer to divre*/
var myPoly = studyArea;
/*Exporting the layer clipped to my study area to drive */
Export.image.toDrive({
 image: dataset,
 region: myPoly,
 description: 'PichinchaStreams',
 scale: 30
});
