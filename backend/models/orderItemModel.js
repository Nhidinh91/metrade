import mongoose from "mongoose";

const LIMIT = 5;

const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Reference to the Order model
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL to the product image
      required: true,
    },
    sold_quantity: {
      type: Number,
      required: true,
      min: 1, // Ensures the quantity is at least 1
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price is not negative
    },
    pickup_point: {
      type: String,
      enum: ["Myllypuro", "Karamalmi", "Myyrmäki"],
      trim: true,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
      min: 0, // Calculated as sold_quantity * price
    },
    selling_status: {
      type: String,
      enum: ["processing", "await-pickup", "delivered", "cancelled"],
      default: "processing", // Default status when the order is created
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);

orderItemSchema.statics.getAllOrderItems = async function (reqQuerry) {
  let orderItems;
  const queryObj = { ...reqQuerry };

  // if query have page, exclude it so I can use find
  const excludingFields = ["page"];
  excludingFields.forEach((el) => delete queryObj[el]);

  const currentPage = reqQuerry.page * 1 || 1;

  const limit = reqQuerry.page ? LIMIT : 100;
  const skip = (currentPage - 1) * limit;
  // console.log("in model");
  console.log(`${currentPage} - ${limit} - ${skip}`);


  orderItems = await this.find(queryObj)
    .sort({ updated_at: -1 })
    .skip(skip)
    .limit(limit);


  const totalOrderItemNum = await this.countDocuments();
  if (reqQuerry.page) {
    orderItems.skip;
  }

  return [totalOrderItemNum, orderItems];
};

orderItemSchema.statics.changeStatus = async function (id, newStatusStr) {
  const updatedOrderItem = await this.findOneAndUpdate(
    { _id: id },
    { $set: { selling_status: `${newStatusStr}` } },
    { returnDocument: "after" }
  );
  return updatedOrderItem;
};

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
