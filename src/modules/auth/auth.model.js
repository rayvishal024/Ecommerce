import mongoose from "mongoose";
import bcrypt from "bcrypt"

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

// pre hook for hash password
userSchema.pre("save", async function () {
     // if password feild modify
     if (!this.isModified("password"))
          return;

     // hash password
     this.password = await bcrypt.hash(this.password, 12)
})

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
     return bcrypt.compare(userPassword, this.password);
}

// user Model
export default mongoose.model("User", userSchema);
