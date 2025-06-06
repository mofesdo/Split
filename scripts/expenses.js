fetch("../expenses.json")
  .then((res) => res.json())
  .then((data) => {
    const expenses = data.expenses;
    console.log(expenses);
    console.log(expenses[0]);
    loadExpenses(expenses);
  })
  .catch(console.error);

const loadExpenses = (expenses) => {
  const expensesList = document.getElementById("expensesList");
  expenses.forEach((item) => {
    const expenseLi = document.createElement("li");
    const name = document.createElement("p");
    name.textContent = item.name;
    const cost = document.createElement("p");
    cost.textContent = item.cost;
    const payer = document.createElement("p");
    payer.textContent = item.payer;
    const friends = document.createElement

    expenseLi.appendChild(name);
    expenseLi.appendChild(cost);
    expenseLi.appendChild(payer);
    expensesList.appendChild(expenseLi);
    console.log(expenseLi);
  });

  console.log(expensesList);
};
