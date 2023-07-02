import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);
    const admin = createdUser[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: admin };
    });
    await Product.insertMany(sampleProducts);
    console.log("imported data!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("destroyed data!");
    Process.exit();
  } catch (error) {
    console.log(error);
    Process.exit(1);
  }
};

if (process.argv[0] === "-d") {
  destroyData();
} else {
  importData();
}

console.log(process.argv);
