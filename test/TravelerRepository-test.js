import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/js/Traveler';
import TravelerRepository from '../src/js/TravelerRepository';
import travelerTestData from '../src/data/traveler-test-data';

describe('TravelerRepository', function() {
  let travelerRepository;
  let traveler1;
  let traveler2;

  beforeEach(() => {
    travelerRepository = new TravelerRepository(travelerTestData);
    traveler1 = travelerRepository.travelers[0];
    traveler2 = travelerRepository.travelers[1];
  });

  it('should be a function', () => {
    expect(TravelerRepository).to.be.a('function');
  });

  it('should be an instance of TravelerRepository', () => {
    expect(travelerRepository).to.be.an.instanceof(TravelerRepository);
  });

  it('should be able to hold an array of all our travelers', () => {
    expect(travelerRepository.travelers).to.be.an('array');
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
  });

  it('should be able to return a user, given an id', () => {
    expect(travelerRepository.getTraveler(1).name).to.eql('Ham Leadbeater');
    expect(travelerRepository.getTraveler(2).id).to.eql(2);
  });

  it('should also add respective trips to each user', () => {
    expect(traveler1.trips).to.eql([
      {
        id: 1,
        userID: 1,
        destinationID: 1,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "pending",
        suggestedActivities: [ ]
      },
      {
        id: 3,
        userID: 1,
        destinationID: 3,
        travelers: 4,
        date: "2022/01/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]);
    expect(traveler2.trips).to.eql([
      {
        id: 2,
        userID: 2,
        destinationID: 2,
        travelers: 5,
        date: "2022/10/04",
        duration: 18,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 4,
        userID: 2,
        destinationID: 2,
        travelers: 2,
        date: "2022/02/25",
        duration: 10,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]);
  });

});
