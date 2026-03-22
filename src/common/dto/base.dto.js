import Joi from "joi";

class BaseDTO {

     static Schema = Joi.object({})
    
     static Validate(data) {
          const { error, value } = this.Schema.validate(data, {
               abortEarly: false,
               stripUnknown: true,
          });
          
            if (error) {
                 const errors = error.details.map((d) => d.message);
                  return { errors, value: null }
            }
            return {errors: null, value };

     }
}
