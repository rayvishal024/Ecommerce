import jwt from 'jsonwebtoken';
import crypto from "crypto";

// generate access token
export const generateAccessToken = (payload) => {
     return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
     { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' });
}

// generate refresh token
export const generateRefreshToken = (payload) => {
     return jwt.sign(payload, process.env.JWT_REFRESH_SECRET,
     { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' });
}

// verify access token
export const verifyAccessToken = (token) => {
  try {
          return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
     } catch (error) {   
          throw new Error('Invalid access token');
     }
}

// veeify refresh token
export const verifyRefreshToken = (token) => {
  try {
          return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
     } catch (error) {   
          throw new Error('Invalid refresh token');
     }
}

// generate reset token
export const generateResetToken = () => {

     // raw token 
     const rawToken = crypto.randomBytes(32).toString("hex");
     
     // hash token
     const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");
     
     return {rawToken, hashToken}
}