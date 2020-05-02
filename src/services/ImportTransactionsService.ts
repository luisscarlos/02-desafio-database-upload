import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

class ImportTransactionsService {
  async execute(filename: string): Promise<string[]> {
    // Transaction[]

    const transactionRepository = getCustomRepository(TransactionRepository);

    const csvFilePath = path.resolve(__dirname, filename);

    // Lê o arquivo linha por linha
    const readCSVStream = fs.createReadStream(csvFilePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    // A cada linha lida(readCSVStream), é enviada(pipe) para parseStream
    const parseCSV = readCSVStream.pipe(parseStream);

    const lines: Array<string> = [];

    // Ouvindo quando as linhas são lidas
    parseCSV.on('data', line => {
      lines.push(line);

      const convertToObject = { ...line };
      console.log(`Linha Objeto: ${convertToObject}`);
      console.log(line);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
      console.log('Leitura do CSV finalizada.');
    });

    console.log(lines);
    return lines;
  }
}

export default ImportTransactionsService;
