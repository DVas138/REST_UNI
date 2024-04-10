"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatBattleSuggestion = exports.creatWarSuggestion = void 0;
const index_1 = require("../index");
function creatWarSuggestion(req) {
    const sql = "INSERT INTO suggestions (message, war, battle) VALUES (?,?,?)";
    const params = [req.body.message, req.params.warId, req.body.battle];
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
exports.creatWarSuggestion = creatWarSuggestion;
function creatBattleSuggestion(req) {
    const sql = "INSERT INTO suggestions (message, war, battle) VALUES (?,?,?)";
    const params = [req.body.message, req.params.warId, req.params.battleId];
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
exports.creatBattleSuggestion = creatBattleSuggestion;
