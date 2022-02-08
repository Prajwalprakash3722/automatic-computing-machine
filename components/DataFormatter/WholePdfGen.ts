import type { Transaction } from '../../types/index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { getTransactionRows, tableHeader } from './DataFormatting';

/**
 * Generate a PDF
 * @param transactions
 */
const generatePDF = (transactions: Transaction[]) => {

  const doc = new jsPDF();

  const tableColumn = tableHeader;
  const tableRows = getTransactionRows(transactions);

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
