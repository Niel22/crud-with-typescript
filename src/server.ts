import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import appConfig from "./config/app";
import db from "./models";

db.sequelize.sync().then(() => {
    console.log("All Database Table Synced");
    app.listen(appConfig.port, () => console.log(`Server running on 127.0.0.1: ${appConfig.port}`));
});