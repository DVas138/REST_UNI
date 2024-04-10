import 'dotenv/config'
import express, {Express,Request,Response} from "express";
import {battlesRouter} from "./Routes/battlesRoutes";
import {warsRoutes} from "./Routes/warsRoutes";
import sqlite3, {Database} from "sqlite3";

// const PORT = 8000;
const app:Express = express();
export const db:Database = new sqlite3.Database('./DB/rest_wars.db', (err) => { //relative to cwd
    (err)?
        console.error(err.message) :
        console.log('Connected to the rest_wars database.');
});
//middle ware to parse json
app.use(express.json());
app.use('/wars', battlesRouter);
app.use('/wars', warsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
