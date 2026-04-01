import ApiError from "../utils/api-error.js";

const validate = (Dtoclass) => {
     return (req, res, next) => {
          const { errors, value } = Dtoclass.Validate(req.body);

          // format error
          if (errors && errors.length > 0) {
               const formattedErrors = errors.map(err =>
                    typeof err === "string" ? err : err.message);

               throw ApiError.badRequest("Validation failed",formattedErrors
               );
          }

          req.body = value
          next()
     }
}


export default validate