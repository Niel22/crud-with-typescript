import { Response } from "express"

export type ValidationErrors = {
    field: string,
    message: string
}

export const success = (res: Response, data: object | unknown[] | boolean | null  = null, message = "Success"): Response => {
    return res.status(200).json({
        message,
        data
    });
}

export const error = (res: Response, message: string = "Bad request"): Response => {
    return res.status(400).json({
        message
    });
}

export const validationError = (res: Response, errors: ValidationErrors[]): Response => {
    return res.status(422).json({
        message: "Validation failed",
        errors
    });
}

export const unauthorized = (res: Response, message: string = "Unauthorized"): Response => {
    return res.status(401).json({ 
        message 
    });
}