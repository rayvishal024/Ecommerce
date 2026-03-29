import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/common/config/db.js";

// dotenv config
dotenv.config();    

// PORT
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to DB
          await connectDB();
         app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
         });
     } catch (error) {
          console.error("Failed to start server:", error);
          process.exit(1);
     }
};

// start server
startServer();