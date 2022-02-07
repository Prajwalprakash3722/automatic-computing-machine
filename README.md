# Accounts

### This is a Account Maintaining System for IEEE RVCE SB.

## Updates

- Some changes are to be yet implemented in `site-rear` for role handling and token handling.

- Should Yet build a UI for easing my life when i have to add users such as treasurers, counsellors, etc....

- As of Now Everything is complete except the `sid` pulling from `site-rear` api [#31](https://github.com/IEEE-RVCE/site-rear/pull/31), if this PR is merged then the `sid` will be pulled from `site-rear` api and stored in the localstorage.

- Paging and Filtering must be done [@chrisvrose](https://github.com/chrisvrose)

#### As of now we have following features:

- Login
- Add new Transaction
- Edit Transaction
- Automatically Calculating the Amount Spent and Amount Remaining based on opening balance and transactions
- Graphical Representation of the Amount Spent by _each societies_ for **main execom level** access
- Graphical Representation of the Amount Spent on _each events_ for **society level** access
- Generating the PDF Report of the Transactions
- Generating the CSV Report of the Transactions
- pdf/docs/image uploading
- separate the pdf uploading into reports and bill section

- 2 Level of Authentication

  - Society Level
  - Main Execom Level
  - Branch and Society Counsellor Level

- **Roles**
- Society Treasurers can add their own transactions,(no access to the main Accounts)
- Society Counsellor can approve or reject the transactions added by society treasurers,(no access to the main Accounts)
- Main Treasurers can add their own transactions or approve the transactions which are already approved by society counsellors ,(full access to the main Accounts)
- Branch Counsellor can approve or reject the transactions approved by Main treasurer,(full access to the main Accounts)
- Branch counsellors and Main treasurer (signed of by)

#### To be Done

- Nan

#### Low Priority:

- Split report generating into quarters
- Automatically mailing the expense report to EXECOM and the respective societies at the end of each month
- Make the application to be easily handed over to the next peep

#### Critical Section

- As of now we are hardcoding the opening balance, if anyone has a better idea please feel free to suggest.
