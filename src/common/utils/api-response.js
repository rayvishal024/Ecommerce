class ApiResponse {

     // Success response
     static ok(res, message = 'Success', data = null) {
          return res.status(200).json({
               success: true,
               message,
               data,
          });
     }

     // created response
     static created(res, message = 'Resource created successfully', data = null) {
          return res.status(201).json({
               success: true,
               message,
               data,
          });
     }
     
     // no content response
     static noContent(res) {
          return res.status(204).send()
     }

     // Bad request response
     static badRequest(res, message = 'Bad request', data = null) {
          return res.status(400).json({
               success: false,
               message,
               data,
          });
     }

}

export default ApiResponse;