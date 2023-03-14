import './App.css';
import React, { useState, useEffect } from 'react';
// import { createLocations } from './api/locations';

import { getData } from './api/openWeather';
import { createLocations, getLocations } from './api/locations';

function App() {
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const getAllLocations = async () => {
      const locations = await getLocations();
      setAllLocations(locations);
      console.log('all locations here', allLocations);
    };
    getAllLocations();
  }, []);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [start, setStart] = useState(0);
  const [endtime, setEndtime] = useState(0);
  const [pm2_5, setpm2_5] = useState(0);
  const [aqi, setAqi] = useState(0);

  const submitHandler = async (event) => {
    event.preventDefault();

    //GET API DATA
    const pollutionData = await getData(lat, lon, start, endtime);
    setpm2_5(`${pollutionData[0].components.pm2_5}`);
    setAqi(`${pollutionData[0].main.aqi}`);
    console.log('state of pm', pm2_5);
    console.log('state of aqi', aqi);

    //ADD DATA TO TABLE
    const newLocation = await createLocations(
      lat,
      lon,
      aqi,
      pm2_5,
      start,
      endtime
    );
    console.log('this is the new location added to the table', newLocation);
    setAllLocations([...allLocations, newLocation]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Air Pollution on PCT</p>
      </header>
      <div>
        <form
          className='form'
          onSubmit={submitHandler}
        >
          <label htmlFor='Lat'>Latitude:</label>
          <input
            value={lat}
            type={'number'}
            onChange={(event) => {
              setLat(event.target.value);
            }}
          ></input>
          <label>Longitude:</label>
          <input
            value={lon}
            type={'number'}
            onChange={(event) => {
              setLon(event.target.value);
            }}
          ></input>
          <label>Start:</label>
          <input
            value={start}
            type={'number'}
            onChange={(event) => {
              setStart(event.target.value);
            }}
          ></input>
          <label>End:</label>
          <input
            value={endtime}
            type={'number'}
            onChange={(event) => {
              setEndtime(event.target.value);
            }}
          ></input>
          <button type={'submit'}>Go!</button>
        </form>
      </div>
      <div>
        Concentration of PM2_5: <span id='output'>{pm2_5}</span> microgram/m^3
      </div>
      <div>
        AQI level: <span id='output'>{aqi}</span>
      </div>

      <div className='location-container'>
        {allLocations.length > 0 &&
          allLocations.map((location) => {
            return (
              <div
                key={location.id}
                className='single-location'
              >
                <div>id: {location.id}</div>
                <div>Latitude: {location.lat}</div>
                <div>Longitude: {location.lon}</div>
                <div>AQI Level: {location.aqi}</div>
                <div>PM_2.5: {location.pm2_5}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
