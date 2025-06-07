const form = document.forms["test-form"]
const result = document.querySelector("#result")
const userList = document.querySelector("#users-list")
const addUser = form.querySelector("#adduser")
const extraUsers = form.querySelector("#extra-users")


const typeOfExpense = form.elements["expense-type"]
const payer = form.elements["users"]
const amount = form.elements["amount"]


let userListArray = []

addUser.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Adding user...")
    const addedUserTemplate = document.querySelector("#added-user-template")
        .content
        .cloneNode(true)

    const addedUserItem = addedUserTemplate.querySelector(".added-user")
    addedUserItem.textContent = extraUsers.value

    userList.appendChild(addedUserTemplate)
    userListArray.push(extraUsers.value)
    console.log("User List Array: ", userListArray) 
})

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const payPerPerson = calculateExpenses();

    const template = getResultsElement();
    template.querySelector(".result-title").textContent = `Total expenses for ${typeOfExpense.value}: $${amount.value}`;
    result.appendChild(template);

    userListArray.forEach(user => {
        const template = getResultsElement();
        template.querySelector(".result-content").textContent = `${user} owes $${payPerPerson} for ${typeOfExpense.value} paid by ${payer.value}.`
        result.appendChild(template);
    })
    
    
    console.log("Type of Expense: ", typeOfExpense)
    console.log("Payer: ", payer)
    console.log("Amount: ", amount)

    form.reset();
    deleteChild();
    
    userListArray = [];


})

function deleteChild() {
    // delete all list items of the userList element
    let listItems = userList.querySelectorAll("li");
    listItems.forEach(item => {
        item.remove();
    });

}


function getResultsElement() {
    const resultTemplate = document.querySelector("#result-template")
        .content
        .cloneNode(true)

    const content = {
        totalAmount: resultTemplate.querySelector(".result-title"),
        extrapayer: resultTemplate.querySelector(".result-content")
    }

    return resultTemplate;
}


function calculateExpenses() {
    let totalUser = 1 // Start with 1 to account for the payer;
    userListArray.forEach(user => {
        totalUser++
    })
    console.log("Total Users: ", totalUser)
    const eachUserAmount = amount.value / totalUser;

    return eachUserAmount.toFixed(2);
}