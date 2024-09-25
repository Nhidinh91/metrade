import Order from "../models/orderModel.js";
import OrderDetail from "../models/orderDetailModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(mongoose.Types.ObjectId.isValid(userId));
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User Id",
      });
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const { id, status, pickup, page } = req.query;
    console.log(`${id} - ${status} - ${pickup} - ${page}`);

    const currentPage = page || 1;
    const limit = 5;
    const skip = (currentPage - 1) * limit;

    const pipeline = [
      { $match: { user_id: userObjectId } },
      {
        $lookup: {
          from: "orderdetails",
          localField: "_id",
          foreignField: "order_id",
          as: "order_detail_list",
        },
      },

      { $sort: { updated_at: -1 } },
      { $unwind: "$order_detail_list" },
      { $replaceRoot: { newRoot: "$order_detail_list" } },
      // {
      //   $group: {
      //     _id: null,
      //     totalOrderDetail: { $sum: 1 },
      //     // $push: "totalOrderDetail",
      //   },
      // },
      // { $skip: skip },
      // { $limit: limit },
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
    // if (page) {
    //   pipeline.push({
    //     $facet: {
    //       $group: {
    //         _id: null,
    //         totalOrderDetail: { $sum: 1 },
    //         // $push: "totalOrderDetail",
    //       },
    //       data: [{ $skip: skip }, { $limit: limit }],
    //     },
    //   });
    // }
    pipeline.push({
      $facet: {
        totalCount: [{ $count: "totalCount" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const orderDetailList = await Order.aggregate(pipeline);
    console.log(orderDetailList);
    const { totalCount, data } = orderDetailList[0];
    // console.log(orderList);
    // let orderDetailList = [];
    // orderList.forEach((order) => [
    //   // console.log(order.order_detail_list),
    //   orderDetailList.push(...order.order_detail_list),
    //   // ...orderDetailList,
    //   // ...order.order_detail_list,
    // ]);
    // console.log(orderDetailList);
    res.status(200).json({
      status: 200,
      data: {
        // count: orderDetailList.length,
        totalOrder: totalCount[0].totalCount,
        limit: limit,
        orderDetailList: data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
