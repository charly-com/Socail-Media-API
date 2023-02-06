"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const utils_1 = require("../utils/utils");
const router = express_1.default.Router();
router.post('/register', userController_1.Register);
router.post('/login', userController_1.Login);
router.post('/upload', utils_1.upload.single('avater'), userController_1.uploadAvater);
exports.default = router;
