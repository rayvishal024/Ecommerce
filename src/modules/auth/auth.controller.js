import { register } from './auth.service.js';
import ApiResponse from "../../common/utils/apiResponse.js";


// register controller
const register = async (req, res) => {

     // Call the register service
     const user = await register(req.body);

     // Send success response
     ApiResponse.created(res, "User registered successfully", user);
};


export { register };