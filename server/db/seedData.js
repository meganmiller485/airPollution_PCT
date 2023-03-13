const client = require('./client');
require('dotenv').config();

const { createLocations, getAllLocations } = require('./locations');

async function dropTables() {
  try {
    console.log('Dropping all tables...');

    await client.query(`
          DROP TABLE IF EXISTS locations;
          `);

    console.log('All tables dropped.');
  } catch (error) {
    console.error('Error dropping tables.');
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Creating tables...');

    await client.query(`
          CREATE TABLE locations (
            id SERIAL PRIMARY KEY,
            lat NUMERIC,
            lon NUMERIC,
            start NUMERIC,
            endtime NUMERIC,
            aqi NUMERIC DEFAULT NULL,
            pm2_5 NUMERIC DEFAULT NULL
          );
  
          `);

    console.log('Tables created.');
  } catch (error) {
    console.error('Error creating tables.');
    throw error;
  }
}

async function createFakeCoords() {
  try {
    console.log('Creating fake coords...');

    const fakeCoords = [
      {
        lat: 32.9167,
        lon: -117.0903,
        start: 1623783720,
        endtime: 1623783720,
      },
      {
        lat: 38.9167,
        lon: -125.0903,
        start: 1623783720,
        endtime: 1623783720,
      },
    ];

    const locations = await Promise.all(fakeCoords.map(createLocations));
    console.log('Locations created:', locations);
    console.log('Finished creating locations!');
  } catch (error) {
    console.log('Error creating fake locations!');
    throw error;
  }
}

async function testDB() {
  try {
    console.log('Testing database...');

    const locations = await getAllLocations();
    console.log('getAllLocations:', locations);

    console.log('Finished database tests!');
  } catch (error) {
    console.error('Error testing database.');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createFakeCoords();
    await testDB();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
