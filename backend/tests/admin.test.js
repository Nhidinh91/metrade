import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import OrderItem from "../models/orderItemModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

const api = supertest(app);

dotenv.config();

// Increase the timeout for the test to 30 seconds
jest.setTimeout(30000);
let accessToken;
let appServer;

// Mock user data
const mockUser = {
  first_name: "Test",
  last_name: "User",
  email: "test.user1@metropolia.fi",
  phone: "123456789",
  balance: 1000,
  password: bcrypt.hashSync("12345678", parseInt(process.env.SALT_ROUNDS)),
  role: "admin",
  photo_url: "",
  is_verified: true,
  status: "active",
};


beforeAll(async () => {
  // Start the server and return the appServer
  appServer = app.listen(0);

  // Insert the mock user into the database
  await User.create(mockUser);

  // Simulate login to get access token
  const res = await supertest(appServer).post("/api/auth/login").send({
    email: mockUser.email,
    password: "12345678",
  });

  // Get the access token
  // 0: Is the refreshToken, 1: Is the accessToken
  accessToken = res.headers["set-cookie"][1];
});



afterAll(async () => {
  // Clean up the database by removing the mock user
  await User.deleteOne({ email: mockUser.email });
  mongoose.connection.close();
  appServer.close();
});

describe("Admin API", () => {
  // Test fetching users
  test("should fetch all users without any parameters given", async () => {
    const response = await api
      .get("/api/admin/users?page=1")
      .set("Cookie", [accessToken])
      .expect(200)
      .expect("Content-Type", /json/);
    expect(response.body.users).toBeDefined();
  });
    

    test("should fetch all users with status banned", async () => {
        const response = await api
        .get("/api/admin/users?page=1&status=banned&search=")
        .set("Cookie", [accessToken])
        .expect(200)
        .expect("Content-Type", /json/);
        expect(response.body.users).toBeDefined();
    });

  // Test updating a user's status
  test("should update user status", async () => {
    const user = await User.findOne({ status: "banned" });
    const response = await api
      .post(`/api/admin/users/${user._id}`)
      .set("Cookie", [accessToken])
      .send({ status: "active" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.status).toBe("active");
  });

  // Test fetching products
  test("should fetch products with pagination", async () => {
    const response = await api
      .get("/api/admin/product?page=1&limit=8")
      .set("Cookie", [accessToken])
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.products).toHaveLength(8);
    expect(response.body.totalProducts).toBeGreaterThan(0);
  });

  // Test activating a product
  test("should activate a product", async () => {
    const newProduct = await Product.findOne({
      status: "processing",
    });

    console.log("newProduct", newProduct);

    const response = await api
      .put(`/api/admin/product/activate/${newProduct._id}`)
      .set("Cookie", [accessToken])
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.product.status).toBe("active");
  });

  // Test fetching order stats
  test("should fetch order item stats", async () => {
    const response = await api
      .get("/api/admin/orders/stats")
      .set("Cookie", [accessToken])
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body.data.allOrderNum).toBeDefined();
    expect(response.body.data.processNum).toBeDefined();
  });
});


