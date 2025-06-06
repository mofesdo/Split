// If expenses exist in local storage, load from there. If not, create it from expenses.json
if (localStorage.getItem("expenses")) {
  const expenses = JSON.parse(localStorage.getItem("expenses"));
  loadExpenses(expenses);
} else {
  fetch("../expenses.json")
    .then((res) => res.json())
    .then((data) => {
      const expenses = data.expenses;
      loadExpenses(expenses);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    })
    .catch(console.error);
}

// Reads expenses array and creates a list item for each and appends to unordered list
function loadExpenses(expenses) {
  const expensesList = document.getElementById("expensesList");
  expenses.forEach((item) => {
    const expenseLi = document.createElement("li");
    const name = document.createElement("p");
    name.textContent = "Expense: " + item.name;
    const cost = document.createElement("p");
    cost.textContent = "Cost: $" + item.cost;
    const payer = document.createElement("p");
    payer.textContent = "Paid By: " + item.payer;
    const friends = document.createElement("p");
    friends.textContent = "Owed By: ";
    item.friends.forEach((friend) => {
      friends.textContent = friends.textContent + " " + friend + " | ";
    });
    expenseLi.appendChild(name);
    expenseLi.appendChild(cost);
    expenseLi.appendChild(payer);
    expenseLi.appendChild(friends);
    expensesList.appendChild(expenseLi);
  });
}
