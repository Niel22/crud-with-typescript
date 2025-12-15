
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validationError } from "../lib/apiResonse";
import { FormatJoiErrors } from "../utils";


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

async function LoginRequest(req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return validationError(res, FormatJoiErrors(error.details));
    }
    
    req.body = value;
    next();
}

export default LoginRequest;