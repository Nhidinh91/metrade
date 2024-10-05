import swaggerUi from "swagger-ui-express";
import adminOrderSwaggerSpec from "./swaggers/admin-order-swagger.json" assert { type: "json" };

const adminOrderDocs = (app) => {
  app.use(
    "/api-docs/admin/orders",
    swaggerUi.serveFiles(adminOrderSwaggerSpec),
    swaggerUi.setup(adminOrderSwaggerSpec)
  );
};

export default adminOrderDocs;
