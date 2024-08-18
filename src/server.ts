import express, { Express } from "express";
import { AppInit } from "./app";

import cors from "cors";
import { DBConnection } from "./common/database/connection/database.connection";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptor";
import { GlobalExceptionFilter } from "./common/response/errors/global.filter.error";
import { adminRouterFactory } from "./routes/admin.route";
import { userRouterFactory } from "./routes/user.route";

export async function main() {
  try {
    const app: Express = express();
    const port: number = 3000;

    await DBConnection.connection().then(() => {
      app.listen(port, () => {
        console.log(`Listing to port ${port}`);
      });
    });

    new AppInit({
      app: app,
      port: port,
      beforeRouteMiddlewares: [cors(), express.json(), ResponseInterCeptor],
      routes: [
        { routeName: "/admin", router: adminRouterFactory() },
        { routeName: "/user", router: userRouterFactory() },
      ],
      afterRouteMiddleWares: [GlobalExceptionFilter],
    });
  } catch (err) {
    console.log("This is Error in Server: ", err);
    throw err;
  }
}

main();
