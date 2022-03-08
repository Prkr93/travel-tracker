import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/js/Traveler';
import DestinationRepository from '../src/js/DestinationRepository';
import TravelerRepository from '../src/js/TravelerRepository';
import travelerTestData from '../src/data/traveler-test-data';
import tripTestData from '../src/data/traveler-test-data';
import destinationTestData from '../src/data/destination-test-data';


describe('Traveler', function() {
  let destinationRepository;
  let travelerRepository;
  let traveler1;
  let traveler2;

  beforeEach(() => {
    destinationRepository = new DestinationRepository(destinationTestData);
    travelerRepository = new TravelerRepository(travelerTestData, tripTestData);
    traveler1 = travelerRepository.travelers[0];
    traveler2 = travelerRepository.travelers[1];
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
  });

  it('should hold an id, name, and travelerType', () => {
    expect(traveler1.id).to.eql(1);
    expect(traveler1.name).to.eql('Ham Leadbeater');
    expect(traveler1.travelerType).to.eql('relaxer');
  });

  it('should hold a different user with id, name, and travelerType', () => {
    expect(traveler2.id).to.eql(2);
    expect(traveler2.name).to.eql('Rachael Vaughten');
    expect(traveler2.travelerType).to.eql('thrill-seeker');
  });

  it('should be able to store an array of trips', () => {
    expect(traveler1.trips).to.be.an('array');
  });

  it('should have only trips that are for the specific traveler', () => {
    expect(traveler1.trips[0].userID).to.eql(1);
    expect(traveler1.trips[1].userID).to.eql(1);
    expect(traveler2.trips[0].userID).to.eql(2);
    expect(traveler2.trips[1].userID).to.eql(2);
  })

  it('should be able to return the total $ amount spent on trips', () => {
    expect(traveler1.getYearlyAmountSpent('2022', destinationRepository)).to.eql(7667);
    expect(traveler2.getYearlyAmountSpent('2022', destinationRepository)).to.eql(9086);
  });

});
