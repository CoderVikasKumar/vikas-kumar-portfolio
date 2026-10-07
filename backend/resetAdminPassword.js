import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";

dotenv.config();

const resetAdminPassword = async () => {
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

    const admin = await Admin.findOne({
      email: cleanEmail,
    });

    if (!admin) {
      console.log("❌ Admin not found.");

      await mongoose.connection.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    admin.password = hashedPassword;

    await admin.save();

    console.log("✅ Admin password updated successfully.");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Password reset error:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

resetAdminPassword();