import Joi from "joi";

class BaseDTO {

     static Schema = Joi.object({});

     static Validate(data) {
          try {
               const { error, value } = this.Schema.validate(data);

               if (error) {
                    const errors = error.details.map((d) => ({
                         field: d.path.join("."),
                         message: d.message,
                    }));

                    return { success: false, errors, value: null };
               }

               return { success: true, errors: null, value };

          } catch (err) {
               return {
                    success: false,
                    errors: ["Validation failed unexpectedly"],
                    value: null,
               };
          }
     }
}

export default BaseDTO;