// Business Logic for AccountList
function AccountList() {
  this.bankAccounts = {};
  this.currentId = 0;
}

AccountList.prototype.addAccount = function (bankAccount) {
  bankAccount.id = this.assignId();
  this.bankAccounts[bankAccount.id] = bankAccount;
}

AccountList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}


// Business Logic for BankAccount

function BankAccount(name, initialDeposit) {
  this.name = name;
  this.initialDeposit = initialDeposit;
}

BankAccount.prototype.deposit = function (amount) {
  if (amount <= 0) {
    return "Cannot deposit a number less than or equal to 0";
  }
  this.initialDeposit += amount;
}

BankAccount.prototype.withdrawl = function (amount) {
  if (amount > this.initialDeposit) {
    return "This value (" + amount + ") is larger than your current balance. Please select a different amount"
  } else {
    this.initialDeposit -= amount;
  };
}


// Business Logic
let bankAccountList = new AccountList;

function createBankAccount(name, deposit) {
  let newAccount = new BankAccount(name, deposit);
  bankAccountList.addAccount(newAccount);
}


// UI Logic

function handleSubmitRegister(event) {
  event.preventDefault();
  const inputName = document.getElementById("newAccountName").value;
  const inputDeposit = parseInt(document.getElementById("newAccountInitDeposit").value);
  createBankAccount(inputName, inputDeposit);
  document.getElementById("alter-bal").removeAttribute("class");
  document.getElementById("display-bal").removeAttribute("class");
  document.getElementById("balance").innerText = inputDeposit;
}

function handleSubmitTransaction(event) {
  event.preventDefault();
  hideErrorWarning();
  const operator = document.querySelector('input[name="deposit/withdraw"]:checked').value
  const amount = document.getElementById("manage-funds").value;
  if (operator === "1" && amount > 0) {
    bankAccountList.bankAccounts[1].deposit(parseInt(amount));
  } else if (amount <= 0) {
    displayErrorWarning("Cannot deposit an amount equal to or less than 0");
  }
  if (operator === "0" && amount <= bankAccountList.bankAccounts[1].initialDeposit) {
    bankAccountList.bankAccounts[1].withdrawl(parseInt(amount));

  } else if (amount > bankAccountList.bankAccounts[1].initialDeposit) {
    displayErrorWarning("Attempted to withdraw more funds than are currently available");
  }
  handleSubmitDisplay();
}

function displayErrorWarning(message) {
  const errorMessageHolder = document.getElementById("errorMessageHolder");
  errorMessageHolder.innerHTML = "Error: " + message;
  errorMessageHolder.removeAttribute("class");
}

function hideErrorWarning() {
  const errorMessageHolder = document.getElementById("errorMessageHolder");
  errorMessageHolder.setAttribute("class", "hidden");
}

function handleSubmitDisplay() {
  const currentBalance = bankAccountList.bankAccounts[1].initialDeposit;
  document.getElementById("balance").innerText = "";
  document.getElementById("balance").innerText = currentBalance;
}

window.addEventListener("load", function () {
  this.document.getElementById("newAccountForm").addEventListener("submit", handleSubmitRegister);
  this.document.getElementById("transaction").addEventListener("submit", handleSubmitTransaction)
})