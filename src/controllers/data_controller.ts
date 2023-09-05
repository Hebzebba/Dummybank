import { Request, Response } from 'express';
import { getCustomerSingleStatement, getAllStatements  } from '../services/data_generate_service';

export function allStatements(req: Request, res: Response) {
  const result = getAllStatements();
  
  if (result.length === 0) {
     return res.status(404).json({ error: 'List not found in cache' });
  }
    res.json({ result });
}
  

export function singleStatement(req: Request, res: Response) {
  const { accountNo, start, end } = req.query;
  if (!accountNo || !start || !end) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  const result = getCustomerSingleStatement(Number(accountNo), String(start), String(end));
  
   if (result.length === 0) {
     return res.status(404).json({ error: 'No matching items found' });
  }
    res.json({ result });
  }
