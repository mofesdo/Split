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

function addExpense(event) {
  event.preventDefault();
  console.log("adding expense...");
}

const addExpenseForm = document.getElementById("addExpense");

const friendsArray = ["Modesto", "Abraham", "Bradley", "Jasmine"];
const friendsSelect = document.getElementById("friends");

addExpenseForm.addEventListener("submit", function (event) {
  const expenses = JSON.parse(localStorage.getItem("expenses"));
  console.log(expenses);
  const formData = new FormData(event.target);
  const expense = formData.get("expense");
  const cost = formData.get("cost");
  const payer = formData.get("payer");
  const selectedFriends = Array.from(
    document.querySelectorAll("input[name='friends']:checked")
  ).map((opt) => opt.value);
  expenses.push({ name: expense, cost, payer, friends: selectedFriends });
  localStorage.setItem("expenses", JSON.stringify(expenses));
});

// Populate the checkbox inputs with array values
friendsArray.forEach((friend) => {
  const wrapper = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "friends";
  checkbox.value = friend;
  checkbox.id = `friend-${friend}`;
  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = friend;
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  friendsSelect.appendChild(wrapper);
});
