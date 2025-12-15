import { ValidationErrorItem } from "joi";
import { ValidationErrors } from "../lib/apiResonse";

export function FormatJoiErrors(errorDetails: ValidationErrorItem[]): ValidationErrors[] 
{
    return errorDetails.map((err: any) => ({
        field: err.path[0] as string,
        message: err.message.replace(/['"]+/g, '') as string
    }));
}

export function FormatError(fieldName: string, message: string): ValidationErrors[] 
{
    return [{ field: fieldName, message: message }];
}