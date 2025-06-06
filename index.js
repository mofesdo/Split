const users = ["Modesto", "Ace", "Bradley", "Jasmine"]

const typeOfExpenses = ["Food", "Transport", "Accomodation"]

let payer
let amount

payer = prompt("Who is paying? (Modesto, Ace, Bradley, Jasmine)")

amount = prompt("What is the amount? (in dollars)")

console.log(`Payer: ${payer}, Amount: $${amount}`)