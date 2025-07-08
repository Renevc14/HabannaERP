import { Router } from 'express';
import { uploadFile, searchUsers } from '../controllers/fileController';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/files', upload.single('file'), uploadFile);
router.get('/users', searchUsers);

export default router;
