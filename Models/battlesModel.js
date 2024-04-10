"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.battleSchema = void 0;
exports.battleSchema = {
    name: { notEmpty: true, errorMessage: 'Name ' + process.env.VALIDATIONERROR, isLength: { options: { max: 255 } },
        matches: { options: /^[a-zA-Z ]+$/ }
    },
    warId: {
        notEmpty: true, errorMessage: 'Start ' + process.env.VALIDATIONERROR,
        matches: { options: /^[0-9]+$/ }
    },
    year: { notEmpty: true, errorMessage: 'End ' + process.env.VALIDATIONERROR, isLength: { options: { min: 3, max: 15 } },
        matches: { options: /^([0-9-]+[A-Z]{2})$/ }
    },
    attacking: { notEmpty: true, errorMessage: 'Attacking ' + process.env.VALIDATIONERROR, isLength: { options: { min: 3, max: 50 } },
        matches: { options: /^[A-Z].+/ }
    },
    defending: { notEmpty: true, errorMessage: 'Defending ' + process.env.VALIDATIONERROR, isLength: { options: { min: 3, max: 50 } },
        matches: { options: /^[A-Z].+/ }
    },
    lat: { notEmpty: true, errorMessage: 'Latitude ' + process.env.VALIDATIONERROR,
        matches: { options: /([0-9]*[.])?[0-9]+/ }
    },
    lng: { notEmpty: true, errorMessage: 'Longitude ' + process.env.VALIDATIONERROR,
        matches: { options: /([0-9]*[.])?[0-9]+/ }
    },
};
