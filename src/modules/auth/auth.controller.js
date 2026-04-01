import * as service from './auth.service.js';
import ApiResponse from "../../common/utils/api-response.js";

// register controller
export const register = async (req, res) => {
   
     // Call the register service
     const user = await service.register(req.body);

     // Send success response
     ApiResponse.created(res, "User registered successfully", user);
};

export const login = async (req, res) => {

     // login sevice
     const { user , accessToken, refreshToken } = await service.login(req.body);

     // send refresh token in cookies
     res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000
     });
     

     // send response
     return ApiResponse.ok(res, "User login successfully", {
          user, accessToken
     });
}

export const verifyEmail = async (req, res) => {
     const user = await service.verifyEmail(req.params.token);

     ApiResponse.ok(res, "Token Verified", user);
}

export const logout = async (req, res) => {
     const user = await service.logout(req.user.id);

     ApiResponse.ok(res, "Logout success", user);
}

export const getMe = async (req, res) => {
     const user = await service.getMe(req.user.id);
     ApiResponse.ok(res, "User Profile", user);
}

export const refresh = async (req, res) => {
     const refreshToken = service.refresh(req.cookies.refreshToken);
     
     ApiResponse.ok(res, "Token Refresh", {
          refreshToken
     })
}