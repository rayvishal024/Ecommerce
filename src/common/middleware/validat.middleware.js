import ApiError from "../utils/api-error.js"

const validate = (DTOClass) => {
     return (req, res, next) => {
          const { errors, value } = DTOClass.Validate(req.body);

          if (errors) {
               throw ApiError.badRequest(errors.join("; "))
          }
          req.body = value;
          next();
     }

}

export default validate;