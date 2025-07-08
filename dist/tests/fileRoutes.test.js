"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.default.close();
}));
describe('POST /api/files', () => {
    it('should upload a CSV file', () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, '..', '..', 'data', 'data.csv');
        expect(fs_1.default.existsSync(filePath)).toBe(true); // Verificación útil
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/api/files')
            .attach('file', filePath);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('The file was uploaded successfully');
    }));
});
describe('GET /api/users', () => {
    it('should search through CSV data', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .get('/api/users?q=John');
        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    }));
});
