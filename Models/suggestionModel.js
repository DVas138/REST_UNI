"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestionSchema = void 0;
exports.suggestionSchema = {
    message: { notEmpty: true, errorMessage: 'Message ' + process.env.VALIDATIONERROR, isLength: { options: { max: 300 } }
    }
};
