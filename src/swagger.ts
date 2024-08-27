import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import { returnUserApiDocs } from "./common/docs/user.doc";
import { returnAdminApiDocs } from "./common/docs/admin.doc";

export function initializeSwaggerOptions(app: Express) {
  const adminDocApis: string[] = returnAdminApiDocs();
  const swaggerAdminOptions: SwaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Admin API",
        version: "1.0.0",
        description: "Admin API Documentation",
      },
    },
    apis: adminDocApis,
  };
  const adminSwaggerSpec = swaggerJsdoc(swaggerAdminOptions);
  app.use(
    "/admin-docs",
    swaggerUi.serveFiles(adminSwaggerSpec),
    swaggerUi.setup(adminSwaggerSpec)
  );

  const userDocApis: string[] = returnUserApiDocs();
  const swaggerUserOptions: SwaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User API",
        version: "1.0.0",
        description: "User API Documentation",
      },
    },
    apis: userDocApis,
  };
  const userSwaggerSpec = swaggerJsdoc(swaggerUserOptions);
  app.use(
    "/user-docs",
    swaggerUi.serveFiles(userSwaggerSpec),
    swaggerUi.setup(userSwaggerSpec)
  );
}
