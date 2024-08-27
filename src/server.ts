import express, { Express } from "express";
import { AppInit } from "./app";

import cors from "cors";
import appConfig from "./common/configs/app.config";
import { DBConnection } from "./common/database/connection/database.connection";
import { GlobalExceptionFilter } from "./common/response/errors/global.filter.error";
import { ResponseInterCeptor } from "./common/response/interceptors/response.interceptor";
import { AdminIndexRouter } from "./routes/admin/admin.index.route";
import { UserIndexRoute } from "./routes/user/user.index.route";
import { initializeSwaggerOptions } from "./swagger";

export async function main() {
  try {
    const app: Express = express();
    const port: number = Number(appConfig.app_port);
    const host: string | undefined = appConfig.app_host ?? "localhost";

    await DBConnection.connection();

    new AppInit({
      app: app,
      port: port,
      host: host,
      beforeRouteMiddlewares: [cors(), express.json(), ResponseInterCeptor],
      routes: [
        { routeName: "/admin", router: AdminIndexRouter.getAdminRouter() },
        { routeName: "/user", router: UserIndexRoute.getUserRouter() },
      ],
      afterRouteMiddleWares: [GlobalExceptionFilter],
    });

    //Swagger
    initializeSwaggerOptions(app);
  } catch (err) {
    console.log("This is Error in Server: ", err);
    throw err;
  }
}

main();
