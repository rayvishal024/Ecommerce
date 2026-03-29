import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
// import { sendVerificationEmail } from "../../common/config/email.js";

// hash token 
const hashToken = (token) =>{
    return crypto.createHash("sha256").update(token).digest("hex");
}

// register service
export const register = async ({ name, email, password , role}) => {

     try {
          // Check if user already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
               throw ApiError.conflict("Email already Exist");
          }
     
          // generate reset token 
          const { rawToken, hashToken } = generateResetToken();
     
          // send raw token at user email
         // await sendVerificationEmail(email, rawToken);
     
          // create user
          let user = await User.create({ name, email, password, role, verificationToken : hashToken });
     
          // convert user into object
          user = user.toObject();
          
          // remove some feild
          delete user.password;
          delete user.verificationToken
         
          // send back response
          return user;
     } catch (error) {
          throw error.message;
     }
}

// login service
export const login = async ({ email, password }) => {
     // find user
     const user = await User.findOne({ email }).select("+password");

     // user not exist
     if (!user) {
          throw ApiError.unauthorized("Invalid email or password")
     }

     // check password
     const isCorrectPassword = await User.comparePassword(password);

     if (!isCorrectPassword) {
          throw ApiError.unauthorized("Invalid email or password");
     }

     // check verifiy user or not
     if (!user.isVerified) {
          throw ApiError.forbidden("Please verify your email before loggin");
     }
          
     // generate access and refresh token
     const accessToken = generateAccessToken({id : user._id, role : user.role});
     const refreshToken = generateRefreshToken({id : user._id});

     // save hashrefresh token 
     user.refreshToken = hashToken(refreshToken);
     await user.save({ validateBeforeSave: false });

   // remove unnecessary feild 
     const userObj = user.toObject();
     delete userObj.password;
     delete userObj.refreshToken;

     // send response
     return { user: userObj, accessToken, refreshToken };
}

// verified token service
export const verifyEmail = async (Token) => {
     // hash token
     const hashedToken = hashToken(Token);

     // find user by token
     const user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken");

     if (!user) {
          throw ApiError.badRequest("Invalid Token");
     }

     user.isVerified = true;
     user.verificationToken = undefined;
     await user.save();

     return user;
}

// get Me
export const getMe = async (id) => {
     const user = await User.findById({ id });

     if (!user) {
          throw ApiError.unauthorized("Please login")
     }

     return user;
}

// refresh token
export const refresh = async () => {

     // token 
     if (!token)
          throw ApiError.unauthorized("Refresh token missing");
     
     // decode token
     const decoded = verifyRefreshToken(token);

     // find user 
     const user = await User.findById(decoded.id).select("+refreshToken");

     if (!user)
      throw ApiError.unauthorized("User not found");

     // validate token 
     if (user.refreshToken !== hashToken(token)) {
          throw ApiError.unauthorized("Invalid refresh token");
     }

     // new access token 
     const accessToken = generateAccessToken({ id: user._id, role: user.role });

     // return 
     return { accessToken };
}

// logout 
export const logout = async (id) => {
     const user = await User.findById(id);

     if (!user)
          throw ApiError.unauthorized("Loggin first")
     
     user.refreshToken = undefined;
     await user.save();

     return user;
}