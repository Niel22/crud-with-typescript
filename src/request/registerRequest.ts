import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import models from "../models";
import { validationError } from "../lib/apiResonse";
import { FormatError, FormatJoiErrors } from "../utils";


const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

async function RegisterRequest(req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return validationError(res, FormatJoiErrors(error.details));
    }
    
    const existingEmail = await models.User.findOne({where: {email: value.email}});
    if(existingEmail)
    {
        return validationError(res, FormatError("email", "this email already exist"));
    }

    req.body = value;
    next();
}

export default RegisterRequest;