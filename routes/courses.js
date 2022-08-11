const express = require("express");

// call the methods created folder controllers
const {getCourses, getCourse} = require("../controllers/courses");

const router = express.Router({mergeParams: true});

router
    .route("/")
    .get(getCourses);

router
    .route("/:id")
    .get(getCourse);

    module.exports = router;