const API_URL = 'http://localhost:5001/api';

export const getLocations = async () => {
  console.log('fetching all locations');
  try {
    const response = await fetch(`${API_URL}/locations`);
    //add a method to pass token

    const data = await response.json();

    // console.log(data.locations);
    return data.locations;
  } catch (error) {
    console.error(error);
  }
};

export const createLocations = async (lat, lon, aqi, pm2_5, start, endtime) => {
  console.log('creating locations..');
  try {
    const response = await fetch(`${API_URL}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat,
        lon,
        aqi,
        pm2_5,
        start,
        endtime,
      }),
    });

    const data = await response.json();

    console.log('this is my location', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
