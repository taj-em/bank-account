Describe BankAccount(name,initialDeposit):

Test: "It will construct a new BankAccount object"
Code: myBankAccount("Test User",400) = new BankAccount;
Expected Output: BankAccount{ name: "Test User", initialDeposit: 400};


Describe BankAccount.prototype.deposit(amount)

Test: "It will add to the initialDeposit value of the BankAccount object"
Code: myBankAccount.deposit(400);
Expected Output: BankAccount{ name: "Test User", initialDeposit: 800};

Test: "It will check if the amount to be deposited is equal to or less than 0.  If so, returns an error"
Code: myBankAccount.deposit(400);
Expected Output: "error"


Describe BankAccount.prototype.withdrawl(amount)

Test: "It will remove funds from the initialDeposit value of the BankAccount object"
Code: myBankAccount.withdrawl(800);
Expected Output: BankAccount{ name: "Test User", initialDeposit: 0};

Test: "It will return an error if the value specified to be withdrawn is larger than the initialDeposit"
Code: myBankAccount.withdrawl(100000);
Expected Output: "This value (100000) is larger than your current balance. Please select a different amount"