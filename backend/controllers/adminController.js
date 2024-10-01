import mongoose from "mongoose";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";

import { isValidId } from "../utils/dbUtils.js";
///User management

///Product management

///Order management
const LIMIT = 8;
const selling_status_list = [
  "processing",
  "await-pickup",
  "delivered",
  "cancelled",
];

export const getOrderItemStats = async (req, res) => {
  try {
    const allOrderNum = await OrderItem.countDocuments();
    const processNum = await OrderItem.countDocuments({
      selling_status: selling_status_list[0],
    });
    const awaitNum = await OrderItem.countDocuments({
      selling_status: selling_status_list[1],
    });
    const deliveredNum = await OrderItem.countDocuments({
      selling_status: selling_status_list[2],
    });
    const cancelledNum = await OrderItem.countDocuments({
      selling_status: selling_status_list[3],
    });

    const stats = {
      allOrderNum,
      processNum,
      awaitNum,
      deliveredNum,
      cancelledNum,
    };
    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllOrderItems = async (req, res) => {
  try {
    let orderItems;
    const queryObj = { ...req.query };
    console.log("query", queryObj);

    // if query have page, exclude it so can use find
    const excludingFields = ["page"];
    excludingFields.forEach((el) => delete queryObj[el]);

    const currentPage = req.query.page * 1 || 1;
    const limit = LIMIT;
    const skip = (currentPage - 1) * limit;
    console.log(`${currentPage} - ${limit} - ${skip}`);

    orderItems = await OrderItem.find(queryObj)
      .sort({ updated_at: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrderItemNum = await OrderItem.countDocuments(queryObj);

    res.status(200).json({
      status: "success",
      totalItems: totalOrderItemNum,
      limit: limit,
      count: orderItems.length,
      data: orderItems,
    });
  } catch (error) {
    res.status(404).json({
      message: "No Order Exists",
    });
  }
};

export const updateOrderItemStatus = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const { selling_status } = req.body;

    if (!orderItemId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing id",
      });
    }
    if (!isValidId(orderItemId)) {
      return res.status(400).json({
        status: "fail",
        message: "invalid id",
      });
    }

    if (!selling_status) {
      console.log("order status", selling_status);
      return res.status(400).json({
        status: "fail",
        message: "Cannot change status",
      });
    }

    const updatedOrderItem = await OrderItem.findOneAndUpdate(
      { _id: orderItemId },
      { $set: { selling_status: `${selling_status}` } },
      { returnDocument: "after" }
    );

    res.status(200).json({
      status: "success",
      data: updatedOrderItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
