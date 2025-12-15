import express, { Express } from "express";
import eventLogger from "./lib/eventLogger";
import router from "./routes";
import errorHandler from "./lib/errorHandler";
import { patchRouterAsync } from "./lib/patchAsync";

const app: Express = express();
patchRouterAsync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(eventLogger.logger);

app.use('/api', router);

app.use(errorHandler.notFound);
app.use(errorHandler.errorHandler);


export default app;