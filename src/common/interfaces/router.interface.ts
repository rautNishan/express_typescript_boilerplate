import { Router } from "express";

export interface ICustomRouter {
  routeName: string;
  router: Router;
}
