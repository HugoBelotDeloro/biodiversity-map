const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const axios = require('axios').default;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Redis client
const client = redis.createClient();
client.on('error', (err) => console.log('Redis: error: ', err));
client.on('connect', () => console.log('Redis: Client connected'));
client.connect();

app.get('/', (req, res) => {
  res.render('index', { title: 'Express', map: true});
});

app.get('/fetchDataset', async (req, res) => {
  const prefix = req.query.prefix;
  let dataset = await client.json.get(`dataset:${prefix}`, '$');
  if (dataset === null) {
    // console.log(`Dataset ${prefix}: cache miss`);
    dataset = (await axios.get('https://nextstrain.org/charon/getDataset', { params: { prefix } })
      .catch(err => console.log('Error fetching: ', err))).data;
    client.json.set(`dataset:${prefix}`, '$', dataset).catch(err => console.log('Error setting data to cache: ', err));
  }
  else {
    // console.log(`Dataset ${prefix}: cache hit`);
  }
  res.send(dataset);
});

app.get('/getGeocode', async (req, res) => {
  const access_token = req.query.access_token;
  const country = req.query.country;
  let geocode = await client.json.get(`geocode:${country}`, '$');
  if (geocode === null) {
    // console.log(`Geocode ${country}: cache miss`);
    geocode = (await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json`, { params: { access_token } })
      .catch(err => console.log('Error fetching: ', err))).data;
    client.json.set(`geocode:${country}`, '$', geocode).catch(err => console.log('Error setting data to cache: ', err));
  }
  else {
    // console.log(`Geocode ${country}: cache hit`);
  }
  res.send(geocode);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
