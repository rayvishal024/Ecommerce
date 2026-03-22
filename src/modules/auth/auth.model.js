import mongoose from "mongoose";

// user Schema
const userSchema = new mongoose.Schema({
     name: {
          type: String,
          trim: true,
          minLength: 3,
          maxLength: 50,
          required: [true, "Name is required"]
     },

     email: {
          type: String,
          trim: true,
          lowercase: true,
          unique: true,
          required: [true, "Email is required"]
     },
     password: {
          type: String,
          trim: true,
          minLength: 8,
          required: [true, "Password is required"],
          select : false
     },
     role: {
          type: String,
          enum: ["customer", "admin", "seller"],
          default: "customer"
     },
     isVerified: {
          type: Boolean,
          default: false
     },

     verificationToken: {
          type: String,
          trim: true,
          select: false
     },
      refreshToken: {
          type: String,
           trim: true,
               select: false
     },
      resetPasswordToken: {
          type: String,
           trim: true,
           select: false
     },
     resetPasswordExpires: {
          type: Date,
           select: false
     }

}, { timestamps: true });

// user Model
export default mongoose.model("User", userSchema);
