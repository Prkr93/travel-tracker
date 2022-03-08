import Traveler from './Traveler';
import tripTestData from '../data/trip-test-data';

class TravelerRepository {
  constructor(travelerData) {
    this.travelers = travelerData.travelers.map(traveler => new Traveler(traveler, tripTestData))
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
}

export default TravelerRepository;
