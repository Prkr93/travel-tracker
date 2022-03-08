import './css/base.scss';
import { travelersData, tripData, destinationData } from './apiCalls';
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
}

window.onload = fetchData;
