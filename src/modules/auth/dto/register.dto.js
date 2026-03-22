import joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {

     static Schema = joi.object({
          name: joi.string().trim().min(3).max(50).required(),
          email: joi.string().email().lowercase().required(),
          password: joi.string().trim().min(8).required().message("Password must be at least 8 characters long"),
          role: joi.string().valid("customer", "admin", "seller").default("customer")
     });
}

export default RegisterDto;