const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
              .then(response => response.json())
              .catch(e => console.log(e))
}





const requestTrip = (tripData) => {
  return fetch(`http://localhost:3001/api/v1/trips`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Please fill out all fields.');
    return response.json()
  })
  .catch(e => error.innerHTML += e)
}






const travelersData = getData('travelers');
const tripData = getData('trips');
const destinationData = getData('destinations');

export {
  travelersData,
  tripData,
  destinationData,
  requestTrip
};
