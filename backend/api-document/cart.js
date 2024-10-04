// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cart API",
    version: "1.0.0",
    description: "API documentation for Cart functionality",
  },
  servers: [
    {
      url: "http://localhost:3000", // Your API server URL
    },
  ],
  paths: {
    "/api/cart/add-cart-item": {
      post: {
        summary: "Add a product to the cart",
        description: "Adds a product to the cart or updates the quantity of the product if it already exists in the cart.",
        tags: ["Cart"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  product: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        description: "Product ID to be added to the cart."
                      }
                    }
                  },
                  adding_quantity: {
                    type: "integer",
                    description: "The number of products to be added to the cart."
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successfully added the product to the cart.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    limit_quantity: { type: "integer", description: "Remaining quantity limit for the product." }
                  }
                }
              }
            }
          },
          "400": { description: "Invalid product ID or quantity." },
          "500": { description: "Internal server error." }
        }
      }
    },
    "/api/cart/get-cart-item": {
      get: {
        summary: "Get cart item details",
        description: "Fetches details of a specific item in the user's cart.",
        tags: ["Cart"],
        parameters: [
          {
            in: "query",
            name: "product_id",
            schema: { type: "string" },
            required: true,
            description: "Product ID of the item to retrieve from the cart."
          }
        ],
        responses: {
          "200": {
            description: "Successfully retrieved the cart item.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    cartItem: { type: "object", description: "Details of the cart item." }
                  }
                }
              }
            }
          },
          "400": { description: "Invalid request parameters." },
          "404": { description: "Cart item not found." },
          "500": { description: "Internal server error." }
        }
      }
    },
    "/api/cart/get-cart-detail": {
      get: {
        summary: "Get full cart details",
        description: "Fetches details of the user's cart including all items.",
        tags: ["Cart"],
        responses: {
          "200": {
            description: "Successfully retrieved the cart details.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    cart_detail: { type: "object", description: "Full details of the cart." }
                  }
                }
              }
            }
          },
          "400": { description: "Failed to retrieve cart." },
          "500": { description: "Internal server error." }
        }
      }
    },
    "/api/cart/update-quantity": {
      put: {
        summary: "Update cart item quantity",
        description: "Updates the quantity of an existing item in the cart.",
        tags: ["Cart"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cart_item: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "ID of the cart item."
                      },
                      quantity: {
                        type: "integer",
                        description: "Quantity to update."
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successfully updated the item quantity.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    cart_item: { type: "object", description: "Updated cart item details." }
                  }
                }
              }
            }
          },
          "400": { description: "Invalid request parameters." },
          "500": { description: "Internal server error." }
        }
      }
    },
    "/api/cart/delete-cart-item/:id": {
      delete: {
        summary: "Delete a cart item",
        description: "Deletes a specific item from the cart.",
        tags: ["Cart"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
            description: "The ID of the cart item to delete."
          }
        ],
        responses: {
          "200": {
            description: "Successfully deleted the cart item.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    deleted_item: { type: "object", description: "Details of the deleted item." }
                  }
                }
              }
            }
          },
          "400": { description: "Invalid item ID." },
          "404": { description: "Cart item not found." },
          "500": { description: "Internal server error." }
        }
      }
    },
    "/api/cart/checkout": {
      post: {
        summary: "Checkout the cart",
        description: "Proceeds with the checkout process for all items in the cart.",
        tags: ["Cart"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  checkout: {
                    type: "object",
                    description: "Checkout details."
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successfully checked out the cart.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    message: { type: "string" },
                    order: { type: "object", description: "Details of the placed order." }
                  }
                }
              }
            }
          },
          "400": { description: "Checkout failed." },
          "500": { description: "Internal server error." }
        }
      }
    }
  }
};

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  apis: [], 
});

function cartDocs(app, port) {
  app.use("/api-docs/cart", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api-docs/cart.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/api-docs/cart`);
}

export default cartDocs;
