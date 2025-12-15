import { format } from "date-fns";
import {v4 as uuid} from "uuid";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { NextFunction, Request, Response } from "express";

class EventLogger {
  constructor() {
      this.logger = this.logger.bind(this);
  }

  public async logEvents(message: string, logName: string): Promise<void>
    {
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    const logDir = path.join(process.cwd(), "logs");

    await fsPromises.mkdir(logDir, { recursive: true });

    await fsPromises.appendFile(
      path.join(logDir, logName),
      logItem
    );
  }

  public logger(req: Request, res: Response, next: NextFunction): void 
  {
    const origin = req.headers.origin || "Unknown Origin";

    this.logEvents(`${req.method}\t${origin}\t${req.url}`, "reqLog.txt").catch(console.error);

    console.log(`${req.method}\t${req.path}`);

    next();
  }
}

export default new EventLogger();