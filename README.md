# wxAlertZonesDownloader

These are scrips that I have written that will download weather alert zones from NOAA.

# Instructions

Run `downloadIndividualZones.js` to download all zone files into a directory. Modify some variables in that file to choose which type of zones to download, and to which directory.

Once all individual files are downloaded into a directory, you need to combine them into one file.
`cd` into the directory with all of your files, and run

```
geojson-merge $(ls $search_path) > ../combined.geojson
```

This will get all of the files in the current directory, and combine them into a geojson file one directory back.

I simplify the files using these steps:
1. go to mapshaper.org
2. upload the file (check both 'detect line intersections' and 'snap vertices')
3. simplify > visvalingam / weighted area > check both 'prevent shape removal' and 'use planar geometry'
4. set to 5%
5. don't repair line intersections (i think?)
6. export as geojson

You can then generate a searchable json using the script at `output/searchable`. A searchable json just means you can query a specific alert zone's data, but it's all contained in one file. They are formatted as such:

```js
const searchableAlertZones = {
    'ILZ095': zone_data,
    'FLZ041': zone_data
}
```
where `zone_data` would be an Object containing the geometry of the zone and its properties. This makes it so if you import `searchableAlertZones` or have it globally, you an access the `FLZ041` zone by doing
```js
const specificAlertZone = searchableAlertZones.FLZ041;
```