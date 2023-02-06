"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const Users_1 = require("../models/Users");
const passportConfig = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        Users_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, (email, password, done) => {
        Users_1.User.findOne({ email }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);
            user.comparePassword(password).then((isMatch) => {
                if (!isMatch)
                    return done(null, false);
                return done(null, user);
            });
        });
    }));
};
exports.passportConfig = passportConfig;
