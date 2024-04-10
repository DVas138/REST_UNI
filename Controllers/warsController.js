"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWar = exports.updateWar = exports.getWar = exports.creatWar = exports.getWars = void 0;
const index_1 = require("../index");
function getWars() {
    return new Promise((resolve, reject) => {
        index_1.db.all("SELECT * FROM wars", (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                //db.close();
                resolve(rows);
            }
        });
    });
}
exports.getWars = getWars;
function creatWar(req) {
    const sql = "INSERT INTO wars (name, year_start, year_end, country_1, country_2) VALUES (?,?,?,?,?)";
    const params = [req.body.name, req.body.start, req.body.end, req.body.attacking, req.body.defending,];
    return new Promise((resolve, reject) => {
        index_1.db.run(sql, params, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                //db.close();
                resolve('Success');
            }
        });
    });
}
exports.creatWar = creatWar;
function getWar(id) {
    return new Promise((resolve, reject) => {
        index_1.db.get("SELECT * FROM wars WHERE war_id = ?", [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                //db.close();
                resolve(rows);
            }
        });
    });
}
exports.getWar = getWar;
function updateWar(data, id) {
    return new Promise((resolve, reject) => {
        index_1.db.run("UPDATE wars set name = ?, year_start = ?, year_end = ?, country_1 = ?, country_2 = ? WHERE war_id = ?", [data.name, data.year_start, data.year_end, data.country_1, data.country_2, id], (err, row) => {
            if (err) {
                //db.close();
                reject(err);
            }
            else {
                ////db.close();
                resolve('Success');
            }
        });
    });
}
exports.updateWar = updateWar;
function deleteWar(id) {
    return new Promise((resolve, reject) => {
        index_1.db.run("DELETE FROM wars WHERE war_id = ?", [id], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                ////db.close();
                resolve('Success');
            }
        });
    });
}
exports.deleteWar = deleteWar;
