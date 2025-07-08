"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.uploadFile = void 0;
const fileService_1 = require("../services/fileService");
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(500).json({ message: 'File upload failed' });
    }
    (0, fileService_1.parseCSV)(path_1.default.join(__dirname, '../../', req.file.path));
    return res.status(200).json({ message: 'The file was uploaded successfully' });
};
exports.uploadFile = uploadFile;
const searchUsers = (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }
    const result = (0, fileService_1.searchCSV)(query);
    return res.status(200).json({ data: result });
};
exports.searchUsers = searchUsers;
