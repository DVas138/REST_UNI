import {Schema} from "express-validator";

export const suggestionSchema:Schema = {
    message: {notEmpty:true, errorMessage: 'Message ' + process.env.VALIDATIONERROR, isLength: { options: { max: 300 } }
    }
}