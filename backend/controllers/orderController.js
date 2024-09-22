import Order from "../models/orderModel.js";
import OrderDetail from "../models/orderDetailModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getAllOrders = async (req, res) => {
  try {
    const userid = req.params.id;
    const userObjectId = new mongoose.Types.ObjectId(userid);
    const { id, status, pickup } = req.query;
    console.log(`${id} - ${status} - ${pickup}`);
    // console.log("id string", userid);
    // console.log("object id", userObjectId);

    // const orderList = await Order.find({ _id: order_id });
    // const orderList = await Order.find({ user_id: user_id });
    // const orderDetailList = await.OrderDetail.find({$in})
    // const orderList = await Order.aggregate([
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
    // const orderList = await Order.aggregate([
    //   { $match: { user_id: mongoose.Types.ObjectId(userid) } },
    //   {
    //     $lookup: {
    //       from: "orderdetails",
    //       localField: "_id",
    //       foreignField: "order_id",
    //       as: "order_detail_list",
    //     },
    //   },
    // ]);
    const orderDetailList = await Order.aggregate(pipeline);
    console.log(orderDetailList);
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
        count: orderDetailList.length,
        orderDetailList,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
