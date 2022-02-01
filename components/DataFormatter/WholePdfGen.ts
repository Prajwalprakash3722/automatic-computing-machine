import { Transaction } from '../../types/index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { parseISO } from "date-fns";
import { format } from "date-fns";

/**
 * Generate a PDF
 * @param transactions
 */
const generatePDF = ( transactions : Transaction[]) => {

  const debitTranscations = transactions.filter(
    (transaction) => transaction.type === "debit"
  );
  const creditTranscations = transactions.filter(
    (transaction) => transaction.type === "credit"
  );


  const Balance =
    transactions[0].amount +
    creditTranscations.reduce((acc, curr) => acc + curr.amount, 0) -
    debitTranscations.reduce((acc, curr) => acc + curr.amount, 0);

  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const doc = new jsPDF();
  const tableColumn = [
    "Id",
    "Date",
    "society",
    "Amount",
    "Type",
    "Balance",
  ];
  const tableRows = [];

  var balance = 0;
  transactions.forEach((data) => {
    {
      data.type === "credit" || data.type === "open"
        ? (balance = balance + data.amount)
        : (balance = balance - data.amount);
    }
    const ticketData = [
      data.id,
      data.date,
      data.society,
      parseRupees(data.amount),
      data.type,
      parseRupees(balance),
    ];
    return tableRows.push(ticketData);
  });
  const lastRow = ["Total Balance", "", "", "", "", parseRupees(Balance)];
  tableRows.push(lastRow);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    margin: { top: 20 },
  });
  doc.text("Transactions ", 14, 15);
  doc.save(`Transactions.pdf`);
};

export default generatePDF;
