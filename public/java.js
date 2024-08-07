// /* Deposit button event handler
// const depositButton = document.getElementById("depositBtn");
// depositButton.addEventListener("click", function () {
//   const depositStringToInt = getInputNumb("amount");

//   updateSpanTest("balance", depositStringToInt);
//   updateSpanTest("balance", depositStringToInt);
// }); */

// // Accessing the balance element
// const newamount = document.getElementById("balance");

// // initial balance to number
// let balance = 0;
// //  adding references to buttons
// const depositButton = document.getElementById("depositBtn");
// const withdrawlbutton = document.getElementById("withdrawBtn");

// // adding event listeners to the button
// depositButton.addEventListener("click", depositMoney);
// withdrawlbutton.addEventListener("click", withdrawMoney);

// // writing a function to get the input number
// function getInputNumber() {
//   const input = document.getElementById("amount").value;
//   return parseFloat(input);
// }

// // function for depositing money to handle the deposit action
// function depositMoney() {
//   const depositAmount = getInputNumber();
//   if (isNaN(depositAmount) || depositAmount <= 0) {
//     console.error("Invalid deposit amount");
//     return;
//   }
//   balance += depositAmount; // incrementing the value
//   console.log(`New Balance: ${balance}`);
//   newamount.textContent = `Balance: $${balance.toFixed(2)}`;
// }

// //function to withdraw money to handle the withdraw action
// function withdrawMoney() {
//   const withdrawAmount = getInputNumber();
//   if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
//     console.error("error");
//     return;
//   }
//   balance -= withdrawAmount;
//   console.log(`New Balance: ${balance}`);
//   newamount.textContent = `Balance: $${balance.toFixed(2)}`;
// }
// //function to update the balance on the screen to update the balance on the screen

// //Table
// //Select elements from the DOM using its ID and assigning them to variables
// const withdraw = document.querySelector("#withdrawBtn");
// const deposit = document.querySelector("#depositBtn");
// const amount = document.querySelector("#amount");
// const remainder = document.querySelector("#balance");

// //Adding eventlisteners to handle the withdraw and deposit actions

// deposit.addEventListener("click", depositCash);
// withdraw.addEventListener("click", withdrawCash);

// //function to deposit cash
// Initialize variables
let balance = 0;
let transactions = [];
const transactionTable = document.getElementById("transactionTable");
const balanceDisplay = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

// Function to update balance display
function updateBalanceDisplay() {
  balanceDisplay.innerText = balance.toFixed(2); // Update to 2 decimal places
}

// Function to log a transaction
function logTransaction(type, amount) {
  const date = new Date().toLocaleString(); // Get current date and time
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td class="px-4 py-2 border">${type}</td>
    <td class="px-4 py-2 border">${amount.toFixed(2)}</td>
    <td class="px-4 py-2 border">${date}</td>
  `;
  transactionTable.appendChild(newRow); // Add the new row to the transaction table
}

// Event listener for Deposit button
depositBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
    // Validate input
    balance += amount; // Update balance
    logTransaction("Deposit", amount); // Log transaction
    updateBalanceDisplay(); // Update displayed balance
    amountInput.value = ""; // Clear input
  } else {
    alert("Please enter a valid amount to deposit.");
  }
});

// Event listener for Withdraw button
withdrawBtn.addEventListener("click", () => {
  const amount = parsefl(amountInput.value);
  if (!isNaN(amount) && amount > 0 && amount <= balance) {
    // Validate input
    balance -= amount; // Update balance
    logTransaction("Withdraw", amount); // Log transaction
    updateBalanceDisplay(); // Update displayed balance
    amountInput.value = ""; // Clear input
  } else if (amount > balance) {
    alert("Insufficient funds.");
  } else {
    alert("Please enter a valid amount to withdraw.");
  }
});

// Initialize the stored transactions when the page loads
function loadTransactions() {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  renderTransactions(transactions);
}

// Initial display update
updateBalanceDisplay();
