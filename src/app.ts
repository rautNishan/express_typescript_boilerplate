import { Express } from "express";

import { IAppOptions } from "./common/interfaces/app.interface";
import { ICustomRouter } from "./common/interfaces/router.interface";
export class AppInit {
  private app: Express;

  private port: number;

  private host: string;
  constructor(options: IAppOptions) {
    this.app = options.app;
    this.port = options.port;
    this.host = options.host;

    this.initializeMiddlewares(options.beforeRouteMiddlewares);

    this.initializeRoutes(options.routes);

    this.initializeMiddlewares(options.afterRouteMiddleWares);

    this.app.listen(this.port, this.host, () => {
      console.log(`Listing to port ${this.port} and host ${this.host}`);
    });
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
