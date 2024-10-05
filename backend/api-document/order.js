import swaggerUi from "swagger-ui-express";
import orderSwaggerSpec from "./swaggers/order-swagger.json" assert { type: "json" };

const orderDocs = (app) => {
  app.use(
    "/api-docs/order",
    swaggerUi.serveFiles(orderSwaggerSpec),
    swaggerUi.setup(orderSwaggerSpec)
  );
};

export default orderDocs;
