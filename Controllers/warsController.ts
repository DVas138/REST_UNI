import {War,Wars} from "../Models/warsModel";
import express, {Request, Response, Router} from "express";
import sqlite3, {Database} from "sqlite3";
import {db} from "../index";

export function getWars():Promise<Wars> {
    return new Promise<Wars>( (resolve, reject) => {
        db.all("SELECT * FROM wars", (err, rows:Wars) => {
            if(err){
                reject(err);
            } else {
                //db.close();
                resolve ( rows)
            }
        });
    })

}

export function creatWar(req:Request):Promise<string>{
    const sql ="INSERT INTO wars (name, year_start, year_end, country_1, country_2) VALUES (?,?,?,?,?)";
    const params =[req.body.name, req.body.start, req.body.end, req.body.attacking, req.body.defending,]
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
export function getWar(id:number):Promise<War> {
    return new Promise<War>( (resolve, reject) => {
        db.get("SELECT * FROM wars WHERE war_id = ?", [id], (err, rows:War) => {
            if(err){
                reject(err);
            } else {
                //db.close();
                resolve ( rows)
            }
        });
    })

}
export function updateWar(data: War,id:number):Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        db.run("UPDATE wars set name = ?, year_start = ?, year_end = ?, country_1 = ?, country_2 = ? WHERE war_id = ?",
            [data.name, data.year_start, data.year_end, data.country_1, data.country_2, id  ], (err:Error, row:object) => {
            if(err){
                //db.close();
                reject(err);
            } else {
                ////db.close();
                resolve('Success')
            }
        })
    })
}

export function deleteWar(id:number):Promise<string> {
    return new Promise<string>( (resolve, reject) => {
        db.run("DELETE FROM wars WHERE war_id = ?", [id], (err:Error, rows:object) => {
            if(err){
                reject(err);
            } else {
                ////db.close();
                resolve ( 'Success')
            }
        });
    })

}

