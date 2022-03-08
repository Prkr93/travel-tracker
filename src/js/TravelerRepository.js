import Traveler from './Traveler';
// import tripTestData from '../data/trip-test-data';

class TravelerRepository {
  constructor(travelerData) {
    this.travelers = travelerData[0].travelers.map(traveler => new Traveler(traveler, travelerData[1]))
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
}

export default TravelerRepository;
