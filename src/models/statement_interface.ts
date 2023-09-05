export interface Customer {
  name: string;
  accountNo: number;
}

export interface Transaction {
  date: string;
  description: string;
  credit: number;
  debt: number;
  balance: number;
}
export interface StatementDetail {
  period: string;
  openingBalance: number;
  closingBalance: number;
}

export interface Statement {
  statementDetail: StatementDetail;
  customer: Customer;
  transactions: Transaction[];
}
