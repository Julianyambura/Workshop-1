// Initialize variables
let balance = 0; // Starting balance
let transactions = []; // Array to store transaction history

// Accessing DOM elements
const transactionTable = document.getElementById("transactionTable");
const balanceDisplay = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

// Function to update the balance display
function updateBalanceDisplay() {
  balanceDisplay.innerText = balance.toFixed(2); // Format to 2 decimal places
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

  // Save transaction to localStorage
  transactions.push({ type, amount, date });
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function to render transactions from localStorage
function renderTransactions(transactions) {
  transactions.forEach((transaction) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td class="px-4 py-2 border">${transaction.type}</td>
      <td class="px-4 py-2 border">${transaction.amount.toFixed(2)}</td>
      <td class="px-4 py-2 border">${transaction.date}</td>
    `;
    transactionTable.appendChild(newRow);
  });
}

// Event listener for Deposit button
depositBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
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
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0 && amount <= balance) {
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

// Load transactions from localStorage when the page loads
function loadTransactions() {
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  renderTransactions(transactions);
}

// Initial display update and load transactions
updateBalanceDisplay();
loadTransactions();
