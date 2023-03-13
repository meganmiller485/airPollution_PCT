const client = require('./client');

async function createLocations({ lat, lon, start, endtime, aqi, pm2_5 }) {
  try {
    const {
      rows: [location],
    } = await client.query(
      `
              INSERT INTO locations (lat, lon, start, endtime, aqi, pm2_5) 
              VALUES ($1, $2, $3, $4, $5, $6) 
              
              RETURNING *;
          `,
      [lat, lon, start, endtime, aqi, pm2_5]
    );

    return location;
  } catch (error) {
    throw error;
  }
}

async function getAllLocations() {
  try {
    const { rows: location } = await client.query(`
      SELECT * FROM locations;
      `);
    return location;
  } catch (error) {
    console.log('error getting all locations');
  }
}

async function updateLocation(id, { ...fields }) {
  console.log('id:', id, 'update fields:', fields);
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    const {
      rows: [location],
    } = await client.query(
      `
        UPDATE locations
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `,

      Object.values(fields)
    );
    console.log('These are my updated locations: ', location);
    return location;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createLocations,
  updateLocation,
  getAllLocations,
};
