import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🍃 MongoDB Connected\n");

    const admins = await Admin.find().select("name email role createdAt");

    console.log("TOTAL ADMINS:", admins.length);
    console.log("--------------------------------");

    admins.forEach((admin, index) => {
      console.log(`ADMIN ${index + 1}`);
      console.log("ID:", admin._id.toString());
      console.log("NAME:", admin.name);
      console.log("EMAIL:", JSON.stringify(admin.email));
      console.log("ROLE:", admin.role);
      console.log("CREATED:", admin.createdAt);
      console.log("--------------------------------");
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

checkAdmin();