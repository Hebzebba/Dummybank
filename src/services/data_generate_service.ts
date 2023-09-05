import {
  StatementDetail,
  Statement,
  Transaction,
} from "../models/statement_interface";
import { faker } from "@faker-js/faker";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const setDataToCache = () => {
  const cacheKey = "myCachedData";

  const cachedData: Statement[] | undefined = cache.get(cacheKey);

  if (cachedData) {
    console.log("Data From Cached");
    return cachedData;
  } else {
    const statements: Statement[] = [];

    for (let i = 0; i < 100; i++) {
      const customer = {
        name: faker.person.fullName(),
        accountNo: Number(faker.finance.accountNumber()),
      };

      const openingBalance = Number(
        faker.finance.amount({ min: 50000, max: 100000 })
      );
      let newBalance = openingBalance;
      const transactions: Transaction[] = [];
      const periodData = faker.date.past().toLocaleDateString("en-US");

      for (let j = 0; j < 50; j++) {
        let newCredit: any;
        let newDebt: any;
        const descrpt = faker.finance.transactionDescription();

        if (descrpt.includes("payment")) {
          newDebt = Number(faker.finance.amount({ min: 100, max: 600 }));
          newCredit = 0;
          newBalance = newBalance - newDebt;
        } else if (descrpt.includes("invoice")) {
          newDebt = Number(faker.finance.amount({ min: 100, max: 400 }));
          newCredit = 0;
          newBalance = newBalance - newDebt;
        } else if (descrpt.includes("withdrawal")) {
          newDebt = Number(faker.finance.amount({ min: 100, max: 300 }));
          newCredit = 0;
          newBalance = newBalance - newDebt;
        } else if (descrpt.includes("deposit")) {
          newDebt = 0;
          newCredit = Number(faker.finance.amount({ min: 100, max: 5000 }));
          newBalance = newBalance + newCredit;
        }
        transactions.push({
          date: faker.date.past().toLocaleDateString("en-US"),
          description: descrpt,
          credit: newCredit,
          debt: newDebt,
          balance: newBalance,
        });
      }

      const statementDetail: StatementDetail = {
        period: periodData,
        openingBalance: openingBalance,
        closingBalance: newBalance,
      };

      statements.push({
        customer,
        statementDetail,
        transactions,
      });
    }
    cache.set(cacheKey, statements, 60 * 60 * 60 * 24 * 7);
  }
};

export const getAllStatements = () => [cache.get("myCachedData")];

export const getCustomerSingleStatement = (
  accountNo: number,
  start: string,
  end: string
) => {
  const cacheKey = "myCachedData";
  const cachedData: Statement[] | undefined = cache.get(cacheKey);
  const startDate = new Date(start);
  const endDate = new Date(end);

  const getSingleStatement = cachedData!.filter(
    (item: any) => item.customer.accountNo === accountNo
  );

  const { customer, statementDetail, transactions } = getSingleStatement[0];

  const getDates = transactions.filter(
    (item: any) =>
      new Date(item.date) >= startDate && new Date(item.date) <= endDate
  );
  return [{ customer, statementDetail, transactions: getDates }];
};
