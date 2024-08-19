import { SwaggerOptions } from "swagger-ui-express";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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
  app.use("/admin-docs", swaggerUi.serve, swaggerUi.setup(adminSwaggerSpec));

  const swaggerUserOptions: SwaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User API",
        version: "1.0.0",
        description: "User API Documentation",
      },
    },
    apis: ["./src/routes/user.route.ts","./src/modules/users/docs/user.doc.ts"],
  };
  const userSwaggerSpec = swaggerJsdoc(swaggerUserOptions);
  app.use("/user-docs", swaggerUi.serve, swaggerUi.setup(userSwaggerSpec));
}
