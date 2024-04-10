import {Battle, Battles} from "../Models/battlesModel";
import express, {Request, Response, Router} from "express";
import sqlite3, {Database} from "sqlite3";
import {db} from "../index"

export function getBattles():Promise<Battles> {
    return new Promise<Battles>( (resolve, reject) => {
        db.all("SELECT * FROM battles", (err, rows:Battles) => {
            if(err){
                reject(err);
            } else {
                //db.close();
                resolve ( rows)
            }
        });
    })

}

export function creatBattle(req:Request, war_id:number):Promise<string>{
    const sql ="INSERT INTO battles (war_id, name, year, country_1, country_2, lat, lng) VALUES (?,?,?,?,?,?,?)";
    const params =[war_id, req.body.name, req.body.year, req.body.attacking, req.body.defending, req.body.lat, req.body.lng]
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
export function getBattle(war_id:number, battle_id:number):Promise<Battle> {
    return new Promise<Battle>( (resolve, reject) => {
        db.get("SELECT * FROM battles WHERE war_id = ? AND battle_id = ?", [war_id, battle_id], (err, row:Battle) => {
            if(err){
                reject(err);
            } else {
                //db.close();
                resolve ( row)
            }
        });
    })

}
export function updateBattle(data: Battle,warId:number, battleId:number):Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        db.run("UPDATE battles set war_id = ?, name = ?, year = ?, country_1 = ?, country_2 = ?, lat = ?, lng = ? WHERE war_id = ? AND battle_id = ?",
            [data.war_id, data.name, data.year, data.country_1, data.country_2, data.lat, data.lng, warId, battleId  ], (err:Error, row:object) => {
                if(err){
                    reject(err);
                    // db.close()
                } else {
                    resolve ( 'Success')
                }
            })
        ;
    })
}

export function deleteBattle(warId:number, battleId:number):Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        db.run("DELETE FROM battles WHERE war_id = ? AND battle_id = ?", [warId, battleId], (err:Error, row:object) => {
            if(err){
                reject(err);
            } else {
                //db.close();
                resolve ( 'Success')
            }
        });
    })

}

