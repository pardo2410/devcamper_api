const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

//  @desc Get courses
//  @route GET /api/v1/courses
//  @route GET /api/v1/bootcamps/:bootcampId/courses
//  @access Public
exports.getCourses = asyncHandler(async(req, res, next) => {
    let query;
    
    if(req.params.bootcampId){
        query = Course.find({bootcamp: req.params.bootcampId});
    }else{
        
        // query = Course.find();
        
        // Call the Bootcamp info
        // query = Course.find().populate("bootcamp");

        // Call specific Bootcamp information
        query = Course.find().populate({
            path: "bootcamp",
            select: "name description"
        });
    };
    
    const courses = await query;
    
    res.status(200).json({
        success: true,
        count: courses.length, 
        data: courses
    }); 
});

//  @desc Get single courses
//  @route GET /api/v1/courses/:id
//  @access Public
exports.getCourse = asyncHandler(async(req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description"
    });
    
    if( !course ){
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`), 
            404
        );
    };

    res.status(200).json({
        success: true,
        count: course.length, 
        data: course
    }); 
});