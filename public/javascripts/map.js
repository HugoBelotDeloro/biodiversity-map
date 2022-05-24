const accessToken = 'pk.eyJ1IjoiaHVnb2JkIiwiYSI6ImNsMms4aHlwNDAxMzIzaW5rN3ZvNmFna3UifQ.nyfKWO_oFrNM_5Vd1NGI6g';

let map = L.map('map', {
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 0.8,
}).setView([0, 0], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken
}).addTo(map);

function walkTree(tree, callback) {
  callback(tree);
  if (tree.children) {
    for (const child of tree.children) {
      walkTree(child, callback);
    }
  }
}

function getCoordinates(name, key, geo_resolutions) {
  for (const region_data of geo_resolutions) {
    if (region_data.key === key) {
      if (region_data.demes[name]) {
        const { latitude, longitude } = region_data.demes[name];
        return [ latitude, longitude];
      }
      console.log(`Error: no ${key} named ${name}`);
      return undefined;
    }
  }
  console.log(`Error: unknown geo_resolution key ${key}`);
  return undefined;
}

async function processTree(data, color, fillColor) {
    const sumPerCountry = {};
    const coordsPerCountry = {};
    walkTree(data.tree, (tree) => {
      let key = null;
      if (tree.node_attrs.country) {
        key = 'country';
      } else if (tree.node_attrs.region) {
        key = 'region';
      } else if (tree.node_attrs.state) {
        key = 'state';
      } else {
        console.log('Error: no geo_resolution information for node ', tree);
      }
      let confidencePerCountry = tree.node_attrs[key].confidence;
      for (const country in confidencePerCountry) {
        if (!sumPerCountry[country]) {
          sumPerCountry[country] = 0;
        }
        sumPerCountry[country] += confidencePerCountry[country];
        if (!coordsPerCountry[country]) {
          coordsPerCountry[country] = getCoordinates(country, key, data.meta.geo_resolutions)
        }
      }

    });
    for (const country of Object.keys(sumPerCountry)) {
      const coords = coordsPerCountry[country];
      L.circle(coords, {
        color,
        fillColor,
        fillOpacity: 0.5,
        radius: 50000 * Math.sqrt(sumPerCountry[country] / Math.PI)
      }).addTo(map);
    }
}

function loadDataset(dataset, color, fillColor) {
  fetch(`/fetchDataset?prefix=${dataset}`)
  .then(res => res.json())
  .catch(err => console.log(`Error fetching dataset ${dataset}`, err))
  .then(res => processTree(res, color, fillColor))
  .catch(err => console.log(`Error processing tree ${dataset}`, err));
}

loadDataset('zika', 'red', '#f03000');
loadDataset('dengue/all', 'blue', '#0030f0');
loadDataset('WNV/NA', 'green', '#00f030');
