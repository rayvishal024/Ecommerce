import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

export const registerController = async(req, res) => {
   try {
        // accept the data from the request body

        console.log("Request body:", req.body); // Debugging log
        const { name, email, password, mobile } = req.body;

        // validate like garib
        if (!name || !email || !password || !mobile) {
                return res.status(400).json({
                        message: "All fields are required"
                });

        };

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user in the database
        const newUser = UserModel.create({
             name,
             email,
             mobile,
          password: hashedPassword,
        })

        res.status(201).json({
             message: "User registered successfully",
             user: newUser,
        });

        //
   } catch (error) {
      console.error("Error in user registration:", error.message);
      res.status(500).json({
           message: "Server error in user registration",
      });
   }
}

