const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const logger =require("./middleware/logger");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Dev logging Middleware
// app.use(logger);
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
};

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});