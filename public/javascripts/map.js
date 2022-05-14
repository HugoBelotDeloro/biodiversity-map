let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHVnb2JkIiwiYSI6ImNsMms4aHlwNDAxMzIzaW5rN3ZvNmFna3UifQ.nyfKWO_oFrNM_5Vd1NGI6g'
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

function processTree(tree) {
    const sumPerCountry = {};
    walkCountries(tree, sumPerCountry);
    console.log(sumPerCountry);
}

fetch('/fetchDataset?prefix=zika')
    .then(res => res.json())
    .then(res => processTree(res.tree))
    .catch(err => console.log('err', err));
