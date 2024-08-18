import express, { Express } from "express";

import path from "path";
import { IAppOptions } from "./common/interfaces/app.interface";
import { ICustomRouter } from "./common/interfaces/router.interface";
export class AppInit {
  private app: Express;

  private port: number;

  constructor(options: IAppOptions) {
    this.app = options.app;
    this.port = options.port;

    this.initializeMiddlewares(options.beforeRouteMiddlewares);

    this.initializeRoutes(options.routes);

    this.initializeMiddlewares(options.afterRouteMiddleWares);
  }

  private initializeMiddlewares(middlewares?: any[]) {
    middlewares?.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeRoutes(routes: ICustomRouter[]) {
    routes.forEach((route) => {
      console.log(`Initializing Routes ${route.routeName}`);
      this.app.use(route.routeName, route.router);
    });
  }

  //For Static content
  // private initializeStaticContent() {
  //   this.app.use();
  // }
}
