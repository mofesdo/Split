const form = document.forms["test-form"]
const result = document.querySelector("#result")
const addUser = form.querySelector("#adduser")



// payer = prompt("Who is paying? (Modesto, Ace, Bradley, Jasmine)")

// amount = prompt("What is the amount? (in dollars)")

addUser.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Adding user...")
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const typeOfExpense = form.elements["expense-type"].value
    const payer = form.elements["users"].value
    const amount = form.elements["amount"].value

    console.log("Type of Expense: ", typeOfExpense)
    console.log("Payer: ", payer)
    console.log("Amount: ", amount)
})
