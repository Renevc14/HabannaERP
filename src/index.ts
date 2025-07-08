import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';

const app = express();
const port = 3000;

app.use(cors());
// Configurar middleware y rutas
app.use(express.json());
app.use('/api', fileRoutes);

const server = app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

export default server;