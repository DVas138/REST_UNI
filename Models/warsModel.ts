import {Schema} from "express-validator";
export interface War{
    war_id?:number,
    name:string,
    year_start:string,
    year_end:string,
    country_1:string,
    country_2:string,
}

export const warSchema:Schema = {
    name: {notEmpty:true, errorMessage: 'Name ' + process.env.VALIDATIONERROR, isLength: { options: { max: 255 } },
        matches: { options: /^[a-zA-Z ]+$/ }
    },
    start: {notEmpty: true, errorMessage: 'Start '  + process.env.VALIDATIONERROR,  isLength: { options: { min:3, max: 15 } },
        matches: { options: /^([0-9]+[A-Z]{2})$/ }
    },
    end: {notEmpty: true, errorMessage: 'End '  + process.env.VALIDATIONERROR,  isLength: { options: { min:3, max: 15 } },
        matches: { options: /^([0-9]+[A-Z]{2})$/ }
    },
    attacking: {notEmpty: true, errorMessage: 'Attacking '  + process.env.VALIDATIONERROR,  isLength: { options: { min:3, max: 50 } },
        matches: { options: /^[A-Z].+/ }
    },
    defending: {notEmpty: true, errorMessage: 'Defending '  + process.env.VALIDATIONERROR, isLength: { options: { min:3, max: 50 } },
        matches: { options: /^[A-Z].+/ }
    },
}

export interface Wars {
    [key:number] : War
}