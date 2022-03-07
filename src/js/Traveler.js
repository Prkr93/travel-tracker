import tripTestData from '../data/trip-test-data';

class Traveler {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.travelerType = user.travelerType,
    this.trips = tripTestData.filter(trip => trip.userID === this.id)
  }
}

export default Traveler;
