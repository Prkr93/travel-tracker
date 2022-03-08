const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
              .then(response => response.json())
              .catch(e => console.log(e))
}


const travelersData = getData('travelers');
const tripData = getData('trips');
const destinationData = getData('destinations');

export {
  travelersData,
  tripData,
  destinationData
};
