import { Express } from "express";
import { ICustomRouter } from "./router.interface";

export interface IAppOptions {
  app: Express;
  port: number;
  beforeRouteMiddlewares?: any[];
  routes: ICustomRouter[];
  afterRouteMiddleWares?: any[];
}
