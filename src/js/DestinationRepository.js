class DestinationRepository {
  constructor(data) {
    this.destinations = data.destinations;
  }

  getCost(id, numDays, numPeople) {
    let destination = this.destinations.find(location => location.id === id);
    let costOfLodging = destination.estimatedLodgingCostPerDay * numDays;
    let costOfFlights = destination.estimatedFlightCostPerPerson * numPeople;
    let cost = costOfLodging + costOfFlights;
    return Math.floor(cost * 1.1);
  }
}

export default DestinationRepository;
