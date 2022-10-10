const fetch = require('node-fetch');
const fs = require('fs');

const fstUrl = 'https://api.weather.gov/zones/forecast'; // 4533
const countyUrl = 'https://api.weather.gov/zones/county'; // 3268
const fireUrl = 'https://api.weather.gov/zones/fire'; // 3530

function fetchFileJSON(url, cb) {
    fetch(url)
    .then(res => res.json())
    .then(data => { cb(data); })
}

function downloadFile(url, fileName, cb) {
    removeFile(fileName);
    const file = fs.createWriteStream(fileName);
    const request = https.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            cb(fileName);
        });
    });
}

var obj = {};

function getZoneFromN(n, data) {
    console.log(n)
    n = n + 1;
    var base = data.features[n];
    fetchFileJSON(base.id, function(data2) {
        fs.writeFileSync(`./fire/${base.properties.id}.json`, JSON.stringify(data2));
        setTimeout(function() {
            getZoneFromN(n, data);
        }, 0)
    })
}

fetchFileJSON(fireUrl, function(data) {
    getZoneFromN(0, data);
})