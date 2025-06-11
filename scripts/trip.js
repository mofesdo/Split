// pages/trip.js
const params = new URLSearchParams(window.location.search);
const tripId = parseInt(params.get("id"));
const trips = JSON.parse(localStorage.getItem("userTrips") || "[]");
const trip = trips.find(t => t.id === tripId);

if (!trip) {
  document.body.innerHTML = "<p>Trip not found.</p>";
  throw new Error("Trip not found");
}

document.getElementById("tripTitle").textContent = trip.title;

const ul = document.getElementById("expensesList");
trip.expenses.forEach(exp => {
  const li = document.createElement("li");
  li.textContent = `${exp.name} - $${exp.cost} paid by ${exp.payer} for ${exp.friends.join(", ")}`;
  ul.appendChild(li);
});

// Populate guests in payer dropdown
const payerSelect = document.getElementById("payer");
trip.guests.forEach(guest => {
  const option = document.createElement("option");
  option.value = guest;
  option.textContent = guest;
  payerSelect.appendChild(option);
});

// Handle adding new expense
document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const cost = parseFloat(document.getElementById("cost").value);
  const payer = document.getElementById("payer").value;
  const friends = document.getElementById("friends").value.split(",").map(f => f.trim());

  const newExpense = { name, cost, payer, friends };

  trip.expenses.push(newExpense);
  localStorage.setItem("userTrips", JSON.stringify(trips));
  location.reload(); // re-render page
});