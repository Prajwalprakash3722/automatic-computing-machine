# Accounts

### This is a Account Maintaining System for IEEE RVCE SB.

#### As of now we have following features:

- Login
- Add new Transaction
- Edit Transaction
- Automatically Calculating the Amount Spent and Amount Remaining based on opening balance and transactions
- Graphical Representation of the Amount Spent by _each societies_ for **main execom level** access
- Graphical Representation of the Amount Spent on _each events_ for **society level** access
- Generating the PDF Report of the Transactions
- Generating the CSV Report of the Transactions
- Society can add their own transactions, ofc they won't have access to the main Accounts
- 2 Level of Authentication
  - Society Level
  - Main Execom Level

#### To be Done

#### Very High Priority

- Pass the decoded token to the next function ,refer [api/transaction/add](https://github.com/IEEE-RVCE/Accounts/blob/17ea7b2c0fb3bccb6eff09ea7a564b910e13bdfa/pages/api/transaction/add.ts#L10)

#### Low Priority:

- Split report generating into quarters
- Automatically mailing the expense report to EXECOM and the respective societies at the end of each month
- Make the application to be easily handed over to the next peep

#### Critical Section

- As of now we are hardcoding the opening balance, if anyone has a better idea please feel free to suggest.
