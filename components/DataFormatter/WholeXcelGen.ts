import type { Transaction } from "../../types/index";
import autoTable from "jspdf-autotable";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import exceljs from "exceljs";
import { saveAs } from "file-saver";
import { getTransactionRows, tableHeader } from "./DataFormatting";

export default async function generateExcelSheet(transactions: Transaction[]) {
  const wb = new exceljs.Workbook();
  const ws = wb.addWorksheet("TransactionList");
  processExcelTransactions(transactions, ws);
  const buffer = await wb.xlsx.writeBuffer();
  const datablob = new Blob([buffer]);
  saveAs(datablob, "Transactions.xlsx");
}

/**
 * Save and render transactions into worksheet
 * @param ts transactions
 * @param ws worksheet
 */
function processExcelTransactions(ts: Transaction[], ws: exceljs.Worksheet) {
  const transactionRows = getTransactionRows(ts);
  const header = tableHeader;
  const tableData = [header, ...transactionRows];

  ws.addRows(tableData);
}
