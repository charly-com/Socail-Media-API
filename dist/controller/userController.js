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
exports.uploadAvater = exports.Login = exports.Register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_1 = require("../models/Users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hash = yield bcrypt_1.default.hash(password, 10);
    const user = new Users_1.User({ email, password: hash });
    yield user.save();
    res.status(201).send('User created');
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield Users_1.User.findOne({ email });
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send('Invalid username or password');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.status(200).send({ token });
});
exports.Login = Login;
const uploadAvater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }
    res.status(200).send('File uploaded successfully.');
});
exports.uploadAvater = uploadAvater;
