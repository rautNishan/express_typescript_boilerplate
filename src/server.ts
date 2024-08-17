import express, { Express } from "express";
import { AppInit } from "./app";

import cors from "cors";
import { DBConnection } from "./common/database/connection/database.connection";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptor";
import { GlobalExceptionFilter } from "./common/response/errors/global.filter.error";

export async function main() {
  try {
    const app: Express = express();
    const port: number = 3000;

    console.log("Initializing DataBae....");

    await DBConnection.connection().then(() => {
      app.listen(port, () => {
        console.log(`Listing to port ${port}`);
      });
    });

    new AppInit({
      app: app,
      port: port,
      beforeRouteMiddlewares: [cors(), express.json(), ResponseInterCeptor],
      routes: [],
      afterRouteMiddleWares: [GlobalExceptionFilter],
    });
  } catch (err) {
    console.log("This is Error in Server: ", err);
    throw err;
  }
}

main();
