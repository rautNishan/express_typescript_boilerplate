import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";
import { returnUserApiDocs } from "./common/docs/user.doc";

export function initializeSwaggerOptions(app: Express) {
  const swaggerAdminOptions: SwaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Admin API",
        version: "1.0.0",
        description: "Admin API Documentation",
      },
    },
    apis: ["./src/routes/admin.route.ts"],
  };
  const adminSwaggerSpec = swaggerJsdoc(swaggerAdminOptions);
  app.use("/admin-docs", swaggerUi.serveFiles(adminSwaggerSpec), swaggerUi.setup(adminSwaggerSpec));

  const userDocApis = returnUserApiDocs();
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
  app.use("/user-docs", swaggerUi.serveFiles(userSwaggerSpec), swaggerUi.setup(userSwaggerSpec));
}
