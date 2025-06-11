// pages/trip.js
const params = new URLSearchParams(window.location.search);
const tripId = parseInt(params.get("id"));
const trips = JSON.parse(localStorage.getItem("userTrips") || "[]");
const trip = trips.find(t => t.id === tripId);

if (!trip) {
  document.body.innerHTML = "<p>Trip not found.</p>";
  throw new Error("Trip not found");
}

const totalCost = trip.expenses.reduce((sum, exp) => sum + exp.cost, 0);

// Update header with trip title and total cost
document.getElementById("tripTitle").textContent = `${trip.title} (Total: $${totalCost.toFixed(2)})`;

const ul = document.getElementById("expensesList");
trip.expenses.forEach(exp => {
  const li = document.createElement("li");
  li.textContent = `${exp.name} - $${exp.cost} paid by ${exp.payer} for ${exp.friends.join(", ")}`;
  ul.appendChild(li);
});

// Populate guests in payer dropdown
const payerSelect = document.getElementById("expense-payer");
trip.guests.forEach(guest => {
  console.log(guest);
  const option = document.createElement("option");
  option.value = guest;
  option.textContent = guest;
  payerSelect.appendChild(option);
});

// Handle adding new expense
document.getElementById("add-expense-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("expense-name").value;
  const cost = parseFloat(document.getElementById("expense-cost").value);
  const payer = document.getElementById("expense-payer").value;
  const friends = document.getElementById("expense-guests").value.split(",").map(f => f.trim());

  const newExpense = { name, cost, payer, friends };

  trip.expenses.push(newExpense);
  localStorage.setItem("userTrips", JSON.stringify(trips));
  location.reload(); // re-render page
});