/*Drawing a rectangle around my study area */
var studyArea = ee.Geometry.Rectangle([-79.018, 0.11, -78.706, -0.08]);
/*Actually drawing the layer in the map*/
Map.addLayer(studyArea, {color:"red"}, "studyArea")
/*Accessing NASA - USDA dataset of global soil moisture, selecting
the band of interest and filtering the date */
var soil2015 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2015-04-01', '2015-04-30'));
var soilMoisture2015 = soil2015.select('susm');
/*Setting up the parameters for visualization (styling) of the layer */
var soilMoistureVis = {
  min: 0.0,
  max: 278.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
/*Centring the map to my study area location and setting up the zoom level */
Map.setCenter(-78.895419, 0.022938,10);
Map.addLayer(soilMoisture2015, soilMoistureVis, 'Soil Moisture 2015');

/*Accessing NASA - USDA dataset of global soil moisture, selecting
the band of interest and filtering the date */
var soil2019 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2019-04-01', '2019-04-30'));
var soilMoisture2019 = soil2019.select('susm');
/*Setting up the parameters for visualization (styling) of the layer */
var soilMoistureVis = {
  min: 0.0,
  max: 278.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.setCenter(-78.895419, 0.022938,10);
Map.addLayer(soilMoisture2019, soilMoistureVis, 'Soil Moisture 2019');
/*setting up the parameters that will define how the graph that
will be set up (Title, font, axes labels, colors used)*/

var options = {
title: 'Moisture',
fontSize: 10,
hAxis: {title: 'Moisture'},
vAxis: {title: 'count'},
series: {
0: {color: 'blue'},
1: {color: 'red'},
}};

var soilList = ee.Image([soilMoisture2015.first(), soilMoisture2019.first()])

/*creating the histogram
*/

var histogram = ui.Chart.image.histogram(soilList, studyArea, 30, 10, 10)
.setSeriesNames(['2015', '2019'])
.setOptions(options);
/*drawing histogram on the console tab
*/
print(histogram)
