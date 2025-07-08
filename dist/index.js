"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
// Configurar middleware y rutas
app.use(express_1.default.json());
app.use('/api', fileRoutes_1.default);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = server;
