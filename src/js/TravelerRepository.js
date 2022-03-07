import Traveler from './Traveler';

class TravelerRepository {
  constructor(data) {
    this.travelers = data.map(traveler => new Traveler(traveler))
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
}

export default TravelerRepository;
