// import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Resquest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute(): Promise<Transaction> {
    // TODO
  }
}

export default CreateTransactionService;
