import swaggerUi from "swagger-ui-express";
import authSwaggerSpec from "./swaggers/auth-swagger.json" assert { type: "json" };

const authDocs = (app) => {
  app.use(
    "/api-docs/auth",
    swaggerUi.serveFiles(authSwaggerSpec),
    swaggerUi.setup(authSwaggerSpec)
  );
};
export default authDocs;
