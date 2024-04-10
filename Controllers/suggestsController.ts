import sqlite3, {Database} from "sqlite3";
import {Request} from "express";
import {db} from "../index";

export function creatWarSuggestion(req:Request):Promise<string>{
    const sql ="INSERT INTO suggestions (message, war, battle) VALUES (?,?,?)";
    const params =[req.body.message, req.params.warId, req.body.battle]
    return new Promise<string>( (resolve, reject) => {
        db.run(sql, params, (err:any, result:object)=>{
            if (err){
                reject (err)
            } else {
                //db.close();
                resolve('Success');
            }
        })
    })
}export function creatBattleSuggestion(req:Request):Promise<string>{
    const sql ="INSERT INTO suggestions (message, war, battle) VALUES (?,?,?)";
    const params =[req.body.message, req.params.warId, req.params.battleId]
    return new Promise<string>( (resolve, reject) => {
        db.run(sql, params, (err:any, result:object)=>{
            if (err){
                reject (err)
            } else {
                //db.close();
                resolve('Success');
            }

        })
    })
}