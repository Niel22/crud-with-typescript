import { NextFunction, Request, Response } from "express";
import { AppError } from "./appError";
import eventLogger from "./eventLogger";


class ErrorHandler extends Error {

    notFound(req: Request, res: Response, next: NextFunction): void {
        next(
            new AppError(
                `Route ${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl} does not exist`,
                404
            )
        );
    }

    errorHandler(
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const statusCode =
            error instanceof AppError ? error.statusCode : res.statusCode || 500;

        eventLogger.logEvents(
            `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${error.name}: ${error.message}`,
            "errorLog.txt"
        );

        // if (error instanceof multer.MulterError) {
        //     res.status(400).json({
        //         message: `Multer error: ${error.message} on field '${error.field}'`
        //     });
        //     return;
        // }

        res.status(statusCode).json({
            message: error.message || "An unexpected error occurred",
            stack:
                process.env.NODE_ENV === "production"
                    ? "Enable development mode for stack trace"
                    : error.stack
        });
    }

}

export default new ErrorHandler();