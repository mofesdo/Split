// main.js
const tripList = document.getElementById("tripList");

// Try loading from localStorage
let trips = JSON.parse(localStorage.getItem("userTrips") || "[]");

// If empty, load from trips.json
if (trips.length === 0) {
  fetch("trips.json")
    .then(res => res.json())
    .then(data => {
      trips = data;
      localStorage.setItem("userTrips", JSON.stringify(trips));
      renderTrips(trips);
    })
    .catch(err => {
      console.error("Failed to load trips.json", err);
      tripList.innerHTML = "<li>Error loading trips.</li>";
    });
} else {
  renderTrips(trips);
}

// Render function
function renderTrips(trips) {
  tripList.innerHTML = "";
  trips.forEach(trip => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `pages/trip.html?id=${trip.id}`;
    a.textContent = trip.title;
    li.appendChild(a);
    tripList.appendChild(li);
  });
}