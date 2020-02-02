//Defining a rectangle around my study area
var studyArea = ee.Geometry.Rectangle([-79.018, 0.11, -78.706, -0.08]);
/*Accessing NDVI 8 day composite from Landsat 8 Thematic Mapper and
filter by a date range (chosen for lack of clouds in study area)*/
var ndvi2013 = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
 .filterDate('2013-08-01', '2013-08-30')
/*Accessing NDVI 8 day composite from Landsat 8 Thematic Mapper and
filter by a date range (chosen for lack of clouds in study area)*/
var ndvi2019 = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
 .filterDate('2019-08-01', '2019-08-20')
//setting up a symbology object that will be used to display both layers
var symbology = {
min: 0.0,
max: 1.0,
palette: [
'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
'66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
'012E01', '011D01', '011301'
],
}
//where to zoom to and zoom level
Map.setCenter(-78.895419, 0.022938,10);
//actually add the layers to the map
Map.addLayer(ndvi2013, symbology, '2013 NDVI')
Map.addLayer(ndvi2019, symbology, '2019 NDVI')
Map.addLayer(studyArea, {color:"red"}, "AOI")
/*setting up the parameters that will define how the graph
will be set up (Title, font, axes labels, colors used)*/
var options = {
title: 'Count of pixels with NDVI scores',
fontSize: 10,
hAxis: {title: 'NDVI score'},
vAxis: {title: 'count'},
series: {
0: {color: 'blue'},
1: {color: 'red'},
}};
//create a list of the two datasets to use in histogram below
var ndviList = ee.Image([ndvi2013.first(), ndvi2019.first()])
/*create the histogram (passing in two images to use), limit to only our
area of interest. The 30, 50, 0.25 parameters indicate the analysis should
take place at 30 m resolution, maximum number of bins, and the bins or range
should be broken into 0.25 increments
*/
var histogram = ui.Chart.image.histogram(ndviList, studyArea, 30, 10, 0.25)
.setSeriesNames(['2013', '2019'])
.setOptions(options);
//actually draw in the Console window
print(histogram)
/*
Creating class breaks that are used to classify the two NDVI images into a set
of numbers that can be multiplied by each other to show the changes from 2013 to 2019
*/
var classbreaks = [0, 0.25, 0.5, 0.75]
var img1classes = [1, 2, 3, 4, 5]
var img2classes = [10, 20, 30, 40, 50]
/*
reclassfication on the 2013 and 2019 NDVI images with the two ouput images
having integer values according to lists img1classes and img2classes
*/
var reclassed = [[ndvi2013.first().clip(studyArea), img1classes], [ndvi2019.first().clip(studyArea), 
img2classes]].map(function(params) {
 var img = params[0]
 var classes = params[1]
 var reclassed = img.lt(classbreaks[0]).multiply(classes[0])
 for (var i = 1; i < classbreaks.length; i += 1) {
 reclassed = reclassed.add(img.gte(classbreaks[i-1]).and(img.lt(classbreaks[i])).multiply(classes[i]))
 }
 reclassed = reclassed.add(img.gte(classbreaks[classbreaks.length-1]).multiply(classes[i]))
 return reclassed
})
//symbology for unchanged raster
var reclassedSymbology = {
 min: 0,
 max: 1,
 palette: [
 'blue', 'red'
 ],
}
//symbology for second change raster
var greenerSymbology = {
 min: 0,
 max: 1,
 palette: [
 'orange', 'green'
 ],
}
//add the two reclassed rasters so matrix can be used
var reclassLayer = reclassed[0].add(reclassed[1])
//creating the final rasters we will display to see changed vs. unchanged and changed up one class
var unchanged = reclassLayer.expression('b(0) == 11 || b(0) == 22 || b(0) == 33 || b(0) == 44 || b(0) == 55')
var plusOne = reclassLayer.expression('b(0) == 21 || b(0) == 32 || b(0) == 43 || b(0) == 54')
//actually add the layers
Map.addLayer(unchanged, reclassedSymbology, 'Unchanged')
Map.addLayer(plusOne, greenerSymbology, 'Plus One')
function count(img) {
var sum = img.reduceRegion({
reducer: ee.Reducer.sum(),
geometry: studyArea,
scale: 30}).get('NDVI')
var count2 = img.reduceRegion({
reducer: ee.Reducer.count(),
geometry: studyArea,
scale: 30}).get('NDVI')
return [ee.Number(count2).subtract(sum), sum]
}
var unchangedStat = count(unchanged)
print('Changed', unchangedStat[0])
print('Unchanged', unchangedStat[1])
var plusOneStat = count(plusOne)
print('One class greener', plusOneStat[1])
print('other', plusOneStat[0])
