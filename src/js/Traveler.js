class Traveler {
  constructor(user) {
    this.id = user.id,
    this.name = user.name,
    this.travelerType = user.travelerType,
    this.trips = []
  }
}

export default Traveler;
