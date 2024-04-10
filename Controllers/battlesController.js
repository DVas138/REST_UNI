"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBattle = exports.updateBattle = exports.getBattle = exports.creatBattle = exports.getBattles = void 0;
const index_1 = require("../index");
function getBattles() {
    return new Promise((resolve, reject) => {
        index_1.db.all("SELECT * FROM battles", (err, rows) => {
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
exports.getBattles = getBattles;
function creatBattle(req, war_id) {
    const sql = "INSERT INTO battles (war_id, name, year, country_1, country_2, lat, lng) VALUES (?,?,?,?,?,?,?)";
    const params = [war_id, req.body.name, req.body.year, req.body.attacking, req.body.defending, req.body.lat, req.body.lng];
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
exports.creatBattle = creatBattle;
function getBattle(war_id, battle_id) {
    return new Promise((resolve, reject) => {
        index_1.db.get("SELECT * FROM battles WHERE war_id = ? AND battle_id = ?", [war_id, battle_id], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                //db.close();
                resolve(row);
            }
        });
    });
}
exports.getBattle = getBattle;
function updateBattle(data, warId, battleId) {
    return new Promise((resolve, reject) => {
        index_1.db.run("UPDATE battles set war_id = ?, name = ?, year = ?, country_1 = ?, country_2 = ?, lat = ?, lng = ? WHERE war_id = ? AND battle_id = ?", [data.war_id, data.name, data.year, data.country_1, data.country_2, data.lat, data.lng, warId, battleId], (err, row) => {
            if (err) {
                reject(err);
                // db.close()
            }
            else {
                resolve('Success');
            }
        });
    });
}
exports.updateBattle = updateBattle;
function deleteBattle(warId, battleId) {
    return new Promise((resolve, reject) => {
        index_1.db.run("DELETE FROM battles WHERE war_id = ? AND battle_id = ?", [warId, battleId], (err, row) => {
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
exports.deleteBattle = deleteBattle;
