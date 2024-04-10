import express, {Request, Response, Router} from "express";
import {checkSchema, body, validationResult} from "express-validator";
import {getWars, creatWar, getWar, updateWar, deleteWar} from "../Controllers/warsController";
import {War, warSchema} from "../Models/warsModel";
import {creatWarSuggestion} from "../Controllers/suggestsController";
import {suggestionSchema} from "../Models/suggestionModel";
export const warsRoutes = express.Router();
warsRoutes.route('/')
    //all wars
    .get(async (req:Request, res:Response) => {
        const wars = await getWars();
        res.json(wars);
    })
    //add a war
    .post(checkSchema(warSchema),async (req:Request, res:Response) => {
        const results = validationResult(req);
        if (results.isEmpty()) {
            const actionMsg:string = await creatWar(req)
            res.json({"message": actionMsg});
        } else {
            res.json( results);
        }
    });
warsRoutes.route('/:warId')
    //one war
    .get(async (req:Request, res:Response) => {
        const param:number = parseInt(req.params.warId);
        const war = await getWar(param);
        res.json(war);
})
    //update a war
    .put(checkSchema(warSchema), async (req:Request, res:Response) => {
        const results = validationResult(req);
        if(results.isEmpty()){
            const param:number = parseInt(req.params.warId);
            const war:War = {
                name:req.body.name,
                year_start:req.body.start,
                year_end:req.body.end,
                country_1:req.body.attacking,
                country_2:req.body.defending,
            }
            const actionMsg:string = await updateWar(war, param);
            res.json({"message": actionMsg});
        } else {
            res.json( results);
        }

    })
    //delete war
    .delete( async (req:Request, res:Response) => {
        const param:number = parseInt(req.params.warId);
        const actionMsg:string = await deleteWar( param);
        res.json({"message": actionMsg});
    });
//add suggestion to a war
warsRoutes.post('/suggest/:warId', checkSchema(suggestionSchema), async (req:Request, res:Response) => {
    const results = validationResult(req);
    if(results.isEmpty()){
        const actionMsg:string = await creatWarSuggestion(req);
        res.json({"message": actionMsg});
    }else {
        res.json( results);
    }
})




