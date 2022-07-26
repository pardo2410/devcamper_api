const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");

//  @desc Get all bootcamps
//  @route GET /api/v1/bootcamps
//  @access Public

// exports.getBootcamps = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.find(); 
//         res.status(200).json({
//             success: true,
//             count: bootcamp.length, 
//             data: bootcamp
//         });   
//     } catch (err) {
//         // res.status(400).json({succes: false});
//         next(err);
//     };
// };

// ****Using the middleware asyncHandler to refactory the code DRY ****
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.find(); 
    res.status(200).json({
        success: true,
        count: bootcamp.length, 
        data: bootcamp
    });
});

//  @desc Get bootcamp
//  @route GET /api/v1/bootcamps/:id
//  @access Public

// exports.getBootcamp = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.findById(req.params.id);
//         if(!bootcamp) {
//             // return res.status(400).json({success: false});
//             return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//         };
//         res.status(200).json({
//             success: true,
//             data: bootcamp
//         });
//     } catch (err) {
//         // res.status(400).json({succes: false});
//         // next(err);
//         // Using custom ErrorResponse Class
//         // next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//         next(err);
//     }
// };

// ****Using the middleware asyncHandler to refactory the code DRY ****
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        // return res.status(400).json({success: false});
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    };
    res.status(200).json({
        success: true,
        data: bootcamp
    });
});




//  @desc Create new bootcamp
//  @route POST /api/v1/bootcamps/:id
//  @access Private

// exports.createBootcamp = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.create(req.body);
//         res.status(201).json({
//             success: true,
//             data: bootcamp
//         });
//     } catch (err) {
//         // res.status(400).json({succes: false});
//         next(err);
//     };
// };

// ****Using the middleware asyncHandler to refactory the code DRY ****
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
});

//  @desc Update bootcamp
//  @route PUT /api/v1/bootcamps/:id
//  @access Private

// exports.updateBootcamp = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });
//         if(!bootcamp) {
//             // return res.status(400).json({success: false});
//             return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//         };
//         res.status(200).json({
//             success: true,
//             data: bootcamp
//         });  
//     } catch (err) {
//         // res.status(400).json({succes: false});
//         next(err);
//     };
// };

// ****Using the middleware asyncHandler to refactory the code DRY ****
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if(!bootcamp) {
        // return res.status(400).json({success: false});
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    };
    res.status(200).json({
        success: true,
        data: bootcamp
    });  
});

//  @desc Delete bootcamp
//  @route DELETE /api/v1/bootcamps/:id
//  @access Private

// exports.deleteBootcamp = async (req, res, next) => {
//     try {
//         const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
//         if(!bootcamp) {
//             // return res.status(400).json({success: false});
//             return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//         };
//         res.status(200).json({
//             success: true,
//             data: {}
//         });  
//     } catch (err) {
//         // res.status(400).json({success: false});
//         next(err);
//     };
// };

// ****Using the middleware asyncHandler to refactory the code DRY ****
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if(!bootcamp) {
        // return res.status(400).json({success: false});
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    };
    res.status(200).json({
        success: true,
        data: {}
    });  
});