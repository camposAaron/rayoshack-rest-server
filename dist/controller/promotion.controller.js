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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePromotion = exports.deletePromotion = exports.getPromotions = exports.getPromotionId = exports.createPromotion = void 0;
const models_1 = require("../models");
const createPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, rest = __rest(_a, ["estado"]);
    const promocion = new models_1.Promocion(rest);
    yield promocion.save();
    res.status(201).json(rest);
});
exports.createPromotion = createPromotion;
const getPromotions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde } = req.query;
    const query = { estado: true };
    const [total, promociones] = yield Promise.all([
        models_1.Promocion.countDocuments(query),
        models_1.Promocion.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        promociones
    });
});
exports.getPromotions = getPromotions;
const getPromotionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const promocion = yield models_1.Promocion.findById({ _id: id });
    res.json({
        promocion
    });
});
exports.getPromotionId = getPromotionId;
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let _b = req.body, { estado } = _b, data = __rest(_b, ["estado"]);
    const promocion = yield models_1.Promocion.findByIdAndUpdate(id, data, { new: true });
    res.json(promocion);
});
exports.updatePromotion = updatePromotion;
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const promocion = yield models_1.Promocion.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(promocion);
});
exports.deletePromotion = deletePromotion;
//# sourceMappingURL=promotion.controller.js.map