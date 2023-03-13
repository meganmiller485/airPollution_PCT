const express = require('express');
const locationsRouter = express.Router();

const { getAllLocations, createLocations, updateLocation } = require('../db');

locationsRouter.use((req, res, next) => {
  console.log('A request is being made to /locations');
  next();
});

locationsRouter.get('/', async (req, res) => {
  const locations = await getAllLocations();

  res.send({
    locations,
  });
});

//CREATE NEW LOCATION

locationsRouter.post('/', async (req, res, next) => {
  const { lat, lon, start, endtime, aqi, pm2_5 } = req.body;

  try {
    const newLocation = await createLocations({
      lat,
      lon,
      start,
      endtime,
      aqi,
      pm2_5,
    });

    res.send(newLocation);
  } catch (error) {
    next(error);
  }
});

locationsRouter.patch('/:locationId', async (req, res, next) => {
  const { lat, lon, start, endtime, aqi, pm2_5 } = req.body;

  const id = req.params.locationId;

  try {
    const updatedLocation = await updateLocation(id, {
      lat,
      lon,
      start,
      endtime,
      aqi,
      pm2_5,
    });

    res.send(updatedLocation);
  } catch (error) {
    next(error);
  }
});

module.exports = locationsRouter;
