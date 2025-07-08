import { Request, Response } from 'express';
import { parseCSV, searchCSV } from '../services/fileService';
import path from 'path';

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(500).json({ message: 'File upload failed' });
    }
    parseCSV(path.join(__dirname, '../../', req.file.path));
    return res.status(200).json({ message: 'The file was uploaded successfully' });
};

export const searchUsers = (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }
    const result = searchCSV(query);
    return res.status(200).json({ data: result });
};
