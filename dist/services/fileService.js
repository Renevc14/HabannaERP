"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCSV = exports.parseCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
let csvData = [];
const parseCSV = (filePath) => {
    csvData = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parse_1.parse)({ columns: true }))
        .on('data', (row) => {
        csvData.push(row);
    })
        .on('end', () => {
        console.log('CSV file successfully processed');
    });
};
exports.parseCSV = parseCSV;
const searchCSV = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    return csvData.filter(row => Object.values(row).some(value => value.toLowerCase().includes(lowerCaseQuery)));
};
exports.searchCSV = searchCSV;
