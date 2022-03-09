const myTrips = document.querySelector('#myTrips');
const pastTrips = document.querySelector('#pastTrips');
const upcomingTrips = document.querySelector('#upcomingTrips');
const pendingTrips = document.querySelector('#pendingTrips');
const amountSpentLastYear = document.querySelector('#amountSpentLastYear');
const selectDestination = document.querySelector('#selectDestination');
const requestTrip = document.querySelector('#requestTrip');
const requestSection = document.querySelector('#requestSection');
const request = document.querySelector('#request');
const userName = document.querySelector('#userName');


const toggleRequest = () => {
  if (request.ariaExpanded === 'false') {
    request.ariaExpanded = 'true';
    requestSection.ariaHidden = 'false';
  } else {
    request.ariaExpanded = 'false';
    requestSection.ariaHidden = 'true';
  }
}

const welcomeUser = (user) => {
  userName.innerHTML = user.name;
}

const updateDom = (user, destinations) => {
  welcomeUser(user);
  populateDashboard(user, destinations);
  populateDestinationList(destinations);
}

const populateDashboard = (user, destinations) => {
  displayTripArticles(user, destinations);
  displayAmountSpentThisYear(user, destinations);
}

const displayTripArticles = (user, destinations) => {
  let today = new Date();
  today = [today.getFullYear(), today.getMonth() + 1, today.getDate()].reduce((acc, val) => {
    val += '';
    if (val.length === 1) {
      val = '0' + val;
    }
    return [...acc, val];
  }, []).join('/');

  let travelerPastTrips = user.trips.filter(trip => trip.date <= today);
  let travelerUpcomingTrips = user.trips.filter(trip => trip.date >= today && trip.status === 'approved');
  let travelerPendingTrips = user.trips.filter(trip => trip.date >= today && trip.status === 'pending');

  if (!travelerPastTrips.length) {
    pastTrips.innerHTML += '<article class="no-trip">You don\'t have any past trips yet!</article>';
  } else {
    travelerPastTrips.forEach(trip => {
      pastTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }
  if (!travelerUpcomingTrips.length) {
    upcomingTrips.innerHTML += '<article class="no-trip">You don\'t have any upcoming trips at this time.</article>';
  } else {
    travelerUpcomingTrips.forEach(trip => {
      upcomingTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }
  if (!travelerPendingTrips.length) {
    pendingTrips.innerHTML += '<article class="no-trip">You do not have any pending trips at this time.</article>';
  } else {
    travelerPendingTrips.forEach(trip => {
      pendingTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }

}

const populateDestinationList = (destinations) => {
  destinations.destinations.forEach(destination => {
    selectDestination.innerHTML += `<option value='${destination.destination}'>${destination.destination}</option>`;
  });
}

const displayAmountSpentThisYear = (user, destinations) => {
  let today = new Date();
  amountSpentLastYear.querySelector('.amount').innerHTML = user.getYearlyAmountSpent(today.getFullYear(), destinations);
}

request.onclick = toggleRequest;

export {
  updateDom
}
