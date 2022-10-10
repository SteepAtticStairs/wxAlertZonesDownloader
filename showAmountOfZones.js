const fetch = require('node-fetch');
const fs = require('fs');

const fstUrl = 'https://api.weather.gov/zones/forecast';
const countyUrl = 'https://api.weather.gov/zones/county';
const fireUrl = 'https://api.weather.gov/zones/fire';

function fetchFileJSON(url, cb) {
    fetch(url)
    .then(res => res.json())
    .then(data => { cb(data); })
}

fetchFileJSON(fireUrl, function(data) {
    console.log(data.features.length)
})