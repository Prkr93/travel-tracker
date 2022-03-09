import './css/base.scss';
import { travelersData, tripData, destinationData, requestTrip } from './apiCalls';
import { updateDom } from './domUpdates';
import Traveler from './js/Traveler';
import TravelerRepository from './js/TravelerRepository';
import DestinationRepository from './js/DestinationRepository';
const main = document.querySelector('main');

const fetchData = (id) => {
  Promise.all([travelersData, tripData, destinationData]).then(data => {
    loadDashboard(data, id);
  });
}


const loadDashboard = (data, id) => {
  const travelers = new TravelerRepository(data[0], data[1]);
  let currentUser = travelers.travelers[id - 1];
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
    let destination = formData.get('destination');
    let requestedDestinationID = getDestinationID(destination, destinations);
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
    estimatedCost.innerHTML = '';
  }

  const displayRequestedCost = (e) => {
    let inputs = e.target.closest('#requestSection').querySelectorAll('input');
    let formFilled = true;
    inputs.forEach(input => {
      if (input.type !== 'submit') {
        if (input.value === '') {
          formFilled = false;
        } else {
          formFilled = true;
        }
      }
    });
    if (formFilled) {
      calculateCost();
    }
  }

  const calculateCost = () => {
    let requestedTrip = new FormData(requestSection);
    let numTravelers = requestedTrip.get('numTravelers');
    let duration = requestedTrip.get('duration');
    let destination = requestedTrip.get('destination');
    let destinationID = getDestinationID(destination, destinations);
    let cost = destinations.getCost(destinationID, duration, numTravelers);
    estimatedCost.innerHTML = `Your estimated cost is $${cost}`;
  }

  requestSection.onsubmit = sendData;
  requestSection.onkeyup = displayRequestedCost;
  requestSection.onclick = displayRequestedCost;
}

const getDestinationID = (destination, destinations) => {
  let destinationName = destination;
  let requestedDestination = destinations.destinations.find(destination => destination.destination === destinationName)
  let requestedDestinationID = requestedDestination.id;
  return requestedDestinationID;
}

const attemptLogin = () => {
  let name = username.value.slice(0, 8);
  let id = username.value.slice(8);
  if (name === 'traveler' && password.value === 'travel' && id <= 50 && id > 0) {
    login.ariaHidden = 'true';
    fetchData(id);
    main.ariaHidden = 'false';
  }
}

submitLogin.onclick = attemptLogin;
// window.onload = fetchData;
