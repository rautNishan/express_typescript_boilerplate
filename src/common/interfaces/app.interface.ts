import { Express } from "express";
import { ICustomRouter } from "./router.interface";

export interface IAppOptions {
  app: Express;
  port: number;
  host: string;
  beforeRouteMiddlewares?: any[];
  routes: ICustomRouter[];
  afterRouteMiddleWares?: any[];
}
