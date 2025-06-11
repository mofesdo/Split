// pages/trip.js
const params = new URLSearchParams(window.location.search);
const tripId = parseInt(params.get("id"));
const trips = JSON.parse(localStorage.getItem("userTrips") || "[]");
const trip = trips.find(trip => trip.id === tripId);

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
  const friends = document.getElementById("expense-guests").value.split(",").map(friend => friend.trim());

  const newExpense = { name, cost, payer, friends };

  trip.expenses.push(newExpense);
  localStorage.setItem("userTrips", JSON.stringify(trips));
  location.reload(); // re-render page
});

function calculateDebts(trip) {
  const debts = {}; // { debtor: { creditor: amount } }

  trip.expenses.forEach(exp => {
    const { cost, payer, friends } = exp;
    const share = cost / friends.length;

    friends.forEach(friend => {
      if (friend === payer) return; // skip if payer paid for themselves

      if (!debts[friend]) debts[friend] = {};
      if (!debts[friend][payer]) debts[friend][payer] = 0;

      debts[friend][payer] += share;
    });
  });

  return debts;
}

const debts = calculateDebts(trip);
const debtDiv = document.querySelector("#debts");

Object.entries(debts).forEach(([debtor, creditors]) => {
  Object.entries(creditors).forEach(([creditor, amount]) => {
    const p = document.createElement("p");
    p.className = "main__text";
    p.textContent = `${debtor} owes ${creditor} $${amount.toFixed(2)}`;
    debtDiv.appendChild(p);
  });
});
