import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import OrderItem from "../models/orderItemModel.js";
import { isValidId } from "../utils/dbUtils.js";
import { json } from "express";

export const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User Id",
      });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const { id, status, pickup, page } = req.query;
    const currentPage = page || 1;
    const limit = 5;
    const skip = (currentPage - 1) * limit;

    const pipeline = [
      { $match: { user_id: userObjectId } },
      {
        $lookup: {
          from: "orderitems",
          localField: "_id",
          foreignField: "order_id",
          as: "order_detail_list",
        },
      },

      { $sort: { updated_at: -1 } },
      { $unwind: "$order_detail_list" },
      { $replaceRoot: { newRoot: "$order_detail_list" } },
    ];
    if (pickup) {
      pipeline.push({
        $match: { pickup_point: pickup },
      });
    }
    if (id) {
      pipeline.push({
        //because id is of any type so show error, put as interpolate
        $match: { order_id: new mongoose.Types.ObjectId(`${id}`) },
      });
    }
    if (status) {
      pipeline.push({
        $match: {
          selling_status: status,
        },
      });
    }

    pipeline.push({
      $facet: {
        totalCount: [{ $count: "totalCount" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const orderItemList = await Order.aggregate(pipeline);
    const { totalCount, data } = orderItemList[0];
    // console.log(orderItemList);
    res.status(200).json({
      status: 200,
      data: {
        totalOrder: totalCount[0].totalCount,
        limit: limit,
        orderItemList: data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// export const getAllOrderItems = async (req, res) => {
//   try {
//     const [totalOrderItemNum, orderItems, limit] =
//       await OrderItem.getAllOrderItems(req.query);

//     res.status(200).json({
//       status: "success",
//       totalItems: totalOrderItemNum,
//       limit: limit,
//       count: orderItems.length,
//       data: orderItems,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "No Order Exists",
//     });
//   }
// };

// export const getOrderItemStats = async (req, res) => {
//   try {
//     console.log("getting stat from controller");
//     const stats = await OrderItem.getStats();
//     res.status(200).json({
//       status: "success",
//       data: stats,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

// export const updateOrderItemStatus = async (req, res) => {
//   try {
//     const { orderItemId } = req.params;
//     // console.log("order item id", orderItemId);
//     const { selling_status } = req.body;
//     console.log(selling_status);
//     if (!orderItemId) {
//       return res.status(400).json({
//         status: "fail",
//         message: "Missing id",
//       });
//     }
//     if (!isValidId(orderItemId)) {
//       return res.status(400).json({
//         status: "fail",
//         message: "invalid id",
//       });
//     }
//     if (!selling_status) {
//       console.log("order status", selling_status);
//       return res.status(400).json({
//         status: "fail",
//         message: "Cannot change status",
//       });
//     }
//     const updatedOrderItem = await OrderItem.changeStatus(
//       orderItemId,
//       selling_status
//     );
//     res.status(201).json({
//       status: "success",
//       data: updatedOrderItem,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };
