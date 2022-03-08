class Traveler {
  constructor(traveler, tripData) {
    this.id = traveler.id,
    this.name = traveler.name,
    this.travelerType = traveler.travelerType,
    this.trips = tripData.trips.filter(trip => trip.userID === this.id)
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
