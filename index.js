"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const battlesRoutes_1 = require("./Routes/battlesRoutes");
const warsRoutes_1 = require("./Routes/warsRoutes");
const sqlite3_1 = __importDefault(require("sqlite3"));
// const PORT = 8000;
const app = (0, express_1.default)();
exports.db = new sqlite3_1.default.Database('./DB/rest_wars.db', (err) => {
    (err) ?
        console.error(err.message) :
        console.log('Connected to the rest_wars database.');
});
//middle ware to parse json
app.use(express_1.default.json());
app.use('/wars', battlesRoutes_1.battlesRouter);
app.use('/wars', warsRoutes_1.warsRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
