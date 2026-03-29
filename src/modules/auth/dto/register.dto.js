import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDTO {
     static Schema = Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          role: Joi.string().valid("customer", "admin").optional()
     });
}

export default RegisterDto;