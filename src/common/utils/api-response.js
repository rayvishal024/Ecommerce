class ApiResponse {

     // Success response
     static ok(data, message = 'Success', data = null) {
          return res.status(200).json({
               success: true,
               message,
               data,
          });
     }

     // created response
     static created(data, message = 'Resource created successfully', data = null) {
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

}