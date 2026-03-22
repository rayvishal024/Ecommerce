import ApiError from "../../common/utils/apiError.js";
import User from "./auth.model.js";

// register service
export const register = async ({ name, email, password }) => {
     // Check if user already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
          throw ApiError.conflict("Email already in use");
     }

     
}