// main.js
const tripList = document.getElementById("tripList");

// Try loading from localStorage
let trips = JSON.parse(localStorage.getItem("userTrips") || "[]");

// If empty, load from trips.json
if (trips.length === 0) {
  fetch("trips.json")
    .then((res) => res.json())
    .then((data) => {
      trips = data;
      localStorage.setItem("userTrips", JSON.stringify(trips));
      renderTrips(trips);
    })
    .catch((err) => {
      console.error("Failed to load trips.json", err);
      tripList.innerHTML = "<li>Error loading trips.</li>";
    });
} else {
  renderTrips(trips);
}

// Add Trip
const form = document.getElementById("add-trip-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("trip-name").value;
  const location = document.getElementById("trip-location").value;
  const guests = document
    .getElementById("trip-guests")
    .value.split(",")
    .map((g) => g.trim());
  const trips = JSON.parse(localStorage.getItem("userTrips") || "[]");

  const newTrip = {
    id: Date.now(),
    title,
    location,
    guests,
    expenses: [],
  };

  trips.push(newTrip);
  localStorage.setItem("userTrips", JSON.stringify(trips));

  window.location.href = `pages/trip.html?id=${newTrip.id}`;
});

// Render function
function renderTrips(trips) {
  tripList.innerHTML = "";
  trips.forEach((trip) => {
    const li = document.createElement("li");
    const name = document.createElement("p");
    const location = document.createElement("p");
    li.className = "trip__card";
    name.className = "trip__card_name";
    name.textContent = "Name: " + trip.title;
    location.className = "trip__card_location";
    location.textContent = "Location: " + trip.location;
    const a = document.createElement("a");
    a.className = "trip__card_link";
    a.href = `pages/trip.html?id=${trip.id}`;
    li.appendChild(name);
    li.appendChild(location);
    a.appendChild(li);
    tripList.appendChild(a);
  });
}
