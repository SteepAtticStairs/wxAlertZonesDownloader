const fs = require('fs');

//console.log(fs.readFileSync('simplifiedCountyZones.geojson'))

function readFile(filePath, cb) {
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err, data){
        if (!err) {
            cb(data);
        } else { console.log(err); }
    });
}

var obj = {};
readFile('simplifiedForecastZones.geojson', function(data) {
    var json = JSON.parse(data);
    for (var i in json.features) {
        var base = json.features[i];
        var zoneID = base.properties.id;
        obj[zoneID] = base;
    }
    fs.writeFileSync('./searchable/forecastZones.js', JSON.stringify(obj));
})