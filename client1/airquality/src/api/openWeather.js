const URL = 'http://api.openweathermap.org/data/2.5/air_pollution/history?';

const appID = '8598a4d81c960ceeaeb4a1cb48f2a5ab';

export const getData = async (lat, lon, start, endtime) => {
  console.log('fetching all locations');
  console.log('stuff to send', lat, lon, start, endtime);
  try {
    const response = await fetch(
      `${URL}lat=${lat}&lon=${lon}&start=${start}&end=${endtime}&appid=${appID}`
    );
    //add a method to pass token

    const data = await response.json();

    console.log('this is data', data);
    return data.list;
  } catch (error) {
    console.error(error);
  }
};
