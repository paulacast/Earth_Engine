/*Centring the map to my study area and setting up the zoom level */
Map.setCenter(-78.895419, 0.022938,10);
/*Drawing a rectangle around my study area */
var studyArea = ee.Geometry.Rectangle([-79.018, 0.11, -78.706, -0.08]);
/*Actually drawing the layer in the map*/
Map.addLayer(studyArea, {color:"red"}, "studyArea")

/*Accessing Copernicus Climate Change Service dataset and selecting the band of interest */

var era5_tp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('total_precipitation')
                  .filter(ee.Filter.date('2019-07-01', '2019-07-30'));
/*Setting up the parameters for visualization (styling) of the layer */
var precipitationVis = {
  min: 0.0,
  max: 300.0,
  palette: ['red', 'yellow', 'green', 'cyan', 'purple'],
}

/*Clipping the analysis to my area of study */
var precipitation = era5_tp.select('total_precipitation').map(function(img){ return img.clip(studyArea)})

/*defining a function and use a reducer (like Zonal Statistics in ArcGIS)
to calculate the descriptive statistics 
*/
function computeStats(img, boundary, band) {
  return {
    'sum': img.reduceRegion(ee.Reducer.sum(), boundary).get(band),
    'mean': img.reduceRegion(ee.Reducer.mean(), boundary).get(band),
    'stdDev': img.reduceRegion(ee.Reducer.stdDev(), boundary).get(band),
  }
}
//call the function above to calculate statistics. We are passing 
//the image and band and the geometry to use
var totalStats = computeStats(precipitation.first(), studyArea, 'total_precipitation')

//print the stats to the console window (mean, sum, st. dev)
print("Julho 2019", totalStats)

//add that data as a layer
Map.addLayer(precipitation, precipitationVis, 'Precipitation Julho')

var dataset = ee.ImageCollection('ECMWF/ERA5/DAILY')
var stats = []
var imgs = []
for (var year = 1979; year <= 2019; year += 1) {
  var julfilter = ee.Filter.date(year + '-07-01', year+'-07-31')
  var juldata = dataset.filter(julfilter).map(function (img) { return img.clip(studyArea) })
  imgs.push(juldata.select('total_precipitation').first())
  Map.addLayer(juldata.select('total_precipitation'), precipitationVis, 'Precipitation' + year);
  stats.push(computeStats(juldata.first(), studyArea, 'total_precipitation'))
}
//print the mean, st dev, and sum for each year
print(stats)


//printing the chart to the Console Window - chart is showing mean precipitation in the study area for
//each July for years in range 
print(ui.Chart.image.series(ee.ImageCollection(imgs), studyArea, ee.Reducer.mean()))

