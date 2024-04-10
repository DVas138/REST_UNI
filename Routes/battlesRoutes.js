"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.battlesRouter = void 0;
const express_1 = __importDefault(require("express"));
const suggestsController_1 = require("../Controllers/suggestsController");
const battlesController_1 = require("../Controllers/battlesController");
const battlesModel_1 = require("../Models/battlesModel");
const suggestionModel_1 = require("../Models/suggestionModel");
const express_validator_1 = require("express-validator");
exports.battlesRouter = express_1.default.Router();
exports.battlesRouter.get('/battles', 
//all battles
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const battles = yield (0, battlesController_1.getBattles)();
    res.json(battles);
}));
exports.battlesRouter.route('/:warId/:battleId')
    //update battle of a war
    .put((0, express_validator_1.checkSchema)(battlesModel_1.battleSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const warId = parseInt(req.params.warId);
        const battle = {
            war_id: req.body.war_id,
            name: req.body.name,
            year: req.body.year,
            country_1: req.body.attacking,
            country_2: req.body.defending,
            lat: req.body.lat,
            lng: req.body.lng
        };
        const actionMsg = yield (0, battlesController_1.updateBattle)(battle, warId, parseInt(req.params.battleId));
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}))
    //delete a battle of a war
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, battlesController_1.deleteBattle)(parseInt(req.params.warId), parseInt(req.params.battleId));
    res.json({ "message": result });
}))
    //one battle of a war
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const battle = yield (0, battlesController_1.getBattle)(parseInt(req.params.warId), parseInt(req.params.battleId));
    res.json(battle);
}));
//add a battle to a war
exports.battlesRouter.post('/:warId', (0, express_validator_1.checkSchema)(battlesModel_1.battleSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const actionMsg = yield (0, battlesController_1.creatBattle)(req, parseInt(req.params.warId));
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}));
exports.battlesRouter.post('/suggest/:warId/:battleId', 
//add suggestion to a battle of a war
(0, express_validator_1.checkSchema)(suggestionModel_1.suggestionSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const actionMsg = yield (0, suggestsController_1.creatBattleSuggestion)(req);
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}));
