import Traveler from './Traveler';

class TravelerRepository {
  constructor(travelerData, tripData) {
    this.travelers = travelerData.travelers.map(traveler => new Traveler(traveler, tripData));
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
}

export default TravelerRepository;
