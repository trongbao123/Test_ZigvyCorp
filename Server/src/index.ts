import express, { Response, Request } from "express";
import { EXPRESS_PORT, HOST, PREFIX, } from "./config/config";
import rootRouter from "./router";
import cors from 'cors';
import { connect } from "./config/db";

connect();
const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

rootRouter(app, PREFIX);

void (async () => {
    try {
        app.listen(EXPRESS_PORT, HOST, () => {
            console.log(`🚀 Express server running on port ${EXPRESS_PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();