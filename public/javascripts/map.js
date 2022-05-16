const accessToken = 'pk.eyJ1IjoiaHVnb2JkIiwiYSI6ImNsMms4aHlwNDAxMzIzaW5rN3ZvNmFna3UifQ.nyfKWO_oFrNM_5Vd1NGI6g';

let map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken
}).addTo(map);

function walkCountries(tree, sumPerCountry) {
    let confidencePerCountry = tree.node_attrs.country.confidence;
    for (const country in confidencePerCountry) {
        if (!sumPerCountry[country]) {
            sumPerCountry[country] = 0;
        }
        sumPerCountry[country] += confidencePerCountry[country];
    }
    if (tree.children) {
        for (const child of tree.children) {
            walkCountries(child, sumPerCountry);
        }
    }
}

async function getCountryCoordinates(country) {
  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${accessToken}`)
      .then(res => res.json())
      .then(res => {
        for (const feature of res.features) {
          if (feature.place_type[0] === 'country') {
            return feature.center;
          }
        }
        return null;
      })
      .catch(err => console.log(`Error fetching coordinates for ${country}`, err));
}

async function processTree(tree) {
    const sumPerCountry = {};
    walkCountries(tree, sumPerCountry);
    const coordinatesPerCountry = {};
    for (const country of Object.keys(sumPerCountry)) {
      const coords = await getCountryCoordinates(country)
      if (coords === null) {
        console.log(`Unknown country ${country}`);
        continue;
      }
      coordinatesPerCountry[country] = coords;
      L.circle([coords[1], coords[0]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50000 * Math.sqrt(sumPerCountry[country] / Math.PI)
      }).addTo(map);
    }
}

fetch('/fetchDataset?prefix=zika')
    .then(res => res.json())
    .catch(err => console.log('Error fetching dataset', err))
    .then(res => processTree(res.tree))
    .catch(err => console.log('Error processing tree', err));
