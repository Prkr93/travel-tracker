import tripTestData from '../data/trip-test-data';


class Traveler {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.travelerType = user.travelerType,
    this.trips = tripTestData.filter(trip => trip.userID === this.id)
  }

  getYearlyAmountSpent(year, repo) {
    let yearlyTrips = this.trips.filter(trip => trip.date.includes(year));
    let amountSpentThatYear = yearlyTrips.reduce((sum, trip) => {
      return sum + repo.getCost(trip.destinationID, trip.duration, trip.travelers);
    }, 0);
    return amountSpentThatYear;
  }
}

export default Traveler;
