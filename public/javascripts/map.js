var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaHVnb2JkIiwiYSI6ImNsMms4aHlwNDAxMzIzaW5rN3ZvNmFna3UifQ.nyfKWO_oFrNM_5Vd1NGI6g'
}).addTo(map);

fetch('/fetchDataset?prefix=zika').then(res => console.log('res', res)).catch(err => console.log('err', err));
