import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🍃 MongoDB Connected");

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD are required in .env"
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({
      email: cleanEmail,
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      name: "Vikas Kumar",
      email: cleanEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully.");
    console.log("Admin ID:", admin._id.toString());

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Admin creation error:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

createAdmin();