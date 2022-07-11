//  @desc Get all courses
//  @route GET /api/v1/courses
//  @access Public
exports.getCourses = (req, res, next) => {
    res.status(200).json({success: true, msg:"Show all courses!"}); 
}