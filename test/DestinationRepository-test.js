import chai from 'chai';
const expect = chai.expect;
// import Traveler from '../src/js/Traveler';
// import TravelerRepository from '../src/js/TravelerRepository';
import DestinationRepository from '../src/js/DestinationRepository';
import destinationTestData from '../src/data/destination-test-data';

describe('DestinationRepository', function() {
  let destinationRepository;
  let destination1;
  let destination2;
  let destination3;

  beforeEach(() => {
    destinationRepository = new DestinationRepository(destinationTestData);
    destination1 = destinationRepository.destinations[0];
    destination2 = destinationRepository.destinations[1];
    destination3 = destinationRepository.destinations[2];
  });

  it('should be a function', () => {
    expect(DestinationRepository).to.be.a('function');
  });

  it('should be an instance of DestinationRepository', () => {
    expect(destinationRepository).to.be.an.instanceof(DestinationRepository);
  });

  it('should be able to hold an array of all possible destinations', () => {
    expect(destinationRepository.destinations).to.be.an('array');
    expect(destination1.destination).to.eql('Lima, Peru');
    expect(destination2.destination).to.eql('Stockholm, Sweden');
    expect(destination3.destination).to.eql('Sydney, Austrailia');
  });

  it('should be able to calculate cost of trip - based on id/days/people', () => {
    expect(destinationRepository.getCost(1, 1, 1)).to.eql(517);
    expect(destinationRepository.getCost(1, 2, 1)).to.eql(594);
    expect(destinationRepository.getCost(1, 2, 2)).to.eql(1034);
    expect(destinationRepository.getCost(2, 3, 3)).to.eql(2904);
    expect(destinationRepository.getCost(3, 7, 5)).to.eql(6226);
  });

  it('should be able to calculate costs of trips for trip-test-data', () => {
    expect(destinationRepository.getCost(1, 8, 1)).to.eql(1056);
    expect(destinationRepository.getCost(2, 18, 5)).to.eql(6270);
    expect(destinationRepository.getCost(3, 17, 4)).to.eql(6611);
    expect(destinationRepository.getCost(2, 10, 2)).to.eql(2816);
  });

});
