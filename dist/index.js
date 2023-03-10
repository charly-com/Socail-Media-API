"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Auth_1 = __importDefault(require("./routes/Auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = process.env.PORT;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(process.env.MONGO_DBNAME)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/api', Auth_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
