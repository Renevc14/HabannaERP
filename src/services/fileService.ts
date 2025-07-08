import fs from 'fs';
import { parse } from 'csv-parse';

interface CsvRow {
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

let csvData: CsvRow[] = [];

export const parseCSV = (filePath: string) => {
    csvData = [];
    fs.createReadStream(filePath)
        .pipe(parse({ columns: true }))
        .on('data', (row: CsvRow) => {
            csvData.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
};

export const searchCSV = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return csvData.filter(row =>
        Object.values(row).some(value =>
            (value as string).toLowerCase().includes(lowerCaseQuery)
        )
    );
};
