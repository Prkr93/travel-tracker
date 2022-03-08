import './css/base.scss';
import { travelersData, tripData, destinationData, requestTrip } from './apiCalls';
import { updateDom } from './domUpdates';
import Traveler from './js/Traveler';
import TravelerRepository from './js/TravelerRepository';
import DestinationRepository from './js/DestinationRepository';

const fetchData = () => {
  Promise.all([travelersData, tripData, destinationData]).then(data => {
    loadDashboard(data);
  });
}





const loadDashboard = (data) => {
  const travelers = new TravelerRepository(data);
  let currentUser = travelers.travelers[2];
  const destinations = new DestinationRepository(data[2]);
  updateDom(currentUser, destinations);

  const sendData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let nextID = 0;
    travelers.travelers.forEach(traveler => {
      traveler.trips.forEach(trip => {
        if (trip.id >= nextID) {
          nextID = trip.id + 1;
        }
      });
    });
    let destinationName = formData.get('destination');
    let requestedDestination = destinations.destinations.find(destination => destination.destination === destinationName)
    let requestedDestinationID = requestedDestination.id;
    const newTripRequest = {
      id: nextID,
      userID: currentUser.id,
      destinationID: requestedDestinationID,
      travelers: formData.get('numTravelers'),
      date: formData.get('date'),
      duration: formData.get('duration'),
      status: "pending",
      suggestedActivities: [ ]
    }
    currentUser.trips.push(newTripRequest);
    updateDom(currentUser, destinations);
    requestTrip(newTripRequest);
    e.target.reset();
  }
  requestSection.onsubmit = sendData;
}

window.onload = fetchData;
