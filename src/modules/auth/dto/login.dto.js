import joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDTO {
     static Schema = joi.object({
          email: joi.string().email().required(),
          password: joi.string().required()
     });
}

export default LoginDto;