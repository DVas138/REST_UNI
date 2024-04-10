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
exports.warsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const warsController_1 = require("../Controllers/warsController");
const warsModel_1 = require("../Models/warsModel");
const suggestsController_1 = require("../Controllers/suggestsController");
const suggestionModel_1 = require("../Models/suggestionModel");
exports.warsRoutes = express_1.default.Router();
exports.warsRoutes.route('/')
    //all wars
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wars = yield (0, warsController_1.getWars)();
    res.json(wars);
}))
    //add a war
    .post((0, express_validator_1.checkSchema)(warsModel_1.warSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const actionMsg = yield (0, warsController_1.creatWar)(req);
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}));
exports.warsRoutes.route('/:warId')
    //one war
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = parseInt(req.params.warId);
    const war = yield (0, warsController_1.getWar)(param);
    res.json(war);
}))
    //update a war
    .put((0, express_validator_1.checkSchema)(warsModel_1.warSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const param = parseInt(req.params.warId);
        const war = {
            name: req.body.name,
            year_start: req.body.start,
            year_end: req.body.end,
            country_1: req.body.attacking,
            country_2: req.body.defending,
        };
        const actionMsg = yield (0, warsController_1.updateWar)(war, param);
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}))
    //delete war
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = parseInt(req.params.warId);
    const actionMsg = yield (0, warsController_1.deleteWar)(param);
    res.json({ "message": actionMsg });
}));
//add suggestion to a war
exports.warsRoutes.post('/suggest/:warId', (0, express_validator_1.checkSchema)(suggestionModel_1.suggestionSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (0, express_validator_1.validationResult)(req);
    if (results.isEmpty()) {
        const actionMsg = yield (0, suggestsController_1.creatWarSuggestion)(req);
        res.json({ "message": actionMsg });
    }
    else {
        res.json(results);
    }
}));
