import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js"
import ApiError from "../../common/utils/api-error.js";

export const isloggedin = async (req, res, next) => {
     // access token
     let token = "";
     if (req.headers.authorization?.startWith("Bearer"))
          token = req.headers.authorization.split(" ")[1];

     if (!token) {
          throw ApiError.unauthorized("Not authenticated")
     }
    
     // decode
     const decoded = verifyAccessToken(token);

     // find user 
     const user = await User.findById(decoded.id);

     if (!user) {
          throw ApiError.unauthorized("User not Exist");
     }

     // add feild with req
     req.user = {
          id: user._id,
          name: user.name,
          email: user.email,
          role : user.role
     }

     next();
}

export const authorize = (...roles) => {
     return (req, res, next) => {

          // check roles
          if (!roles.includes(req.user.role)) {
               throw ApiError.forbidden(
                    "You do not have permission to perform this action",
               );
          }
          next();
     };
};