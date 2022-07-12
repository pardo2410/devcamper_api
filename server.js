const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();


// const logger =require("./middleware/logger");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

// Body parser, help the API to read the json data send using postman
app.use(express.json());

// Dev logging Middleware
// app.use(logger);
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
};

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bold);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red.underline.bold);
    // Close server & exit process
    server.close(() => process.exit(1));
});