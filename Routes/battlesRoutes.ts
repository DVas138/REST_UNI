import express, {Request, Response, Router} from "express";
import {creatBattleSuggestion} from "../Controllers/suggestsController";
import {creatBattle, deleteBattle, getBattle, getBattles, updateBattle} from "../Controllers/battlesController";
import {Battles, Battle, battleSchema} from "../Models/battlesModel";
import {suggestionSchema} from "../Models/suggestionModel";
import {checkSchema, validationResult} from "express-validator";


export const battlesRouter: Router = express.Router();
battlesRouter.get('/battles',
    //all battles
    async (req: Request, res: Response) => {
        const battles: Battles = await getBattles();
        res.json(battles);
})

battlesRouter.route('/:warId/:battleId')
    //update battle of a war
    .put(
        checkSchema(battleSchema), async (req: Request, res: Response) => {
        const results = validationResult(req);
        if (results.isEmpty()) {
            const warId: number = parseInt(req.params.warId);
            const battle: Battle = {
                war_id: req.body.war_id,
                name: req.body.name,
                year: req.body.year,
                country_1: req.body.attacking,
                country_2: req.body.defending,
                lat: req.body.lat,
                lng: req.body.lng
            }
            const actionMsg: string = await updateBattle(battle, warId, parseInt(req.params.battleId))
            res.json({"message": actionMsg});
        } else {
            res.json(results);
        }
    })
    //delete a battle of a war
    .delete(
        async (req: Request, res: Response) => {
            const result: string = await deleteBattle(parseInt(req.params.warId), parseInt(req.params.battleId));
            res.json({"message": result});
        })
    //one battle of a war
    .get(
        async (req: Request, res: Response) => {
            const battle: Battle = await getBattle(parseInt(req.params.warId), parseInt(req.params.battleId))
            res.json(battle);
        })
//add a battle to a war
battlesRouter.post('/:warId',
    checkSchema(battleSchema),
    async (req: Request, res: Response) => {
        const results = validationResult(req);
        if (results.isEmpty()) {
            const actionMsg: string = await creatBattle(req, parseInt(req.params.warId));
            res.json({"message": actionMsg});
        } else {
            res.json(results);
        }

})

battlesRouter.post('/suggest/:warId/:battleId',
    //add suggestion to a battle of a war
    checkSchema(suggestionSchema), async (req: Request, res: Response) => {
        const results = validationResult(req);
        if (results.isEmpty()) {
            const actionMsg: string = await creatBattleSuggestion(req);
            res.json({"message": actionMsg});
        } else {
            res.json(results);
        }
})

