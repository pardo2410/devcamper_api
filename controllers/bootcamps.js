const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder"); 
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
    let query;
    
    //  Copy req.query
    const reqQuery = { ...req.query};
    
    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];
    
    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g , match => `$${match}`);
    
    // Finding resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");
    
    // Select fields
    if(req.query.select){
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields);
    }
    
    // Sort 
    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    }else{
        // query = query.sort("-createdAt");
        query = query.sort({ "createdAt": 'asc', name: -1 });
    };

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments(); 

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const bootcamp = await query; 

    // Pagination result
    const pagination = {};
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        };
    };
    if(startIndex > 0){
        pagination.prev={
            page: page - 1,
            limit
        };
    };

    res.status(200).json({
        success: true,
        count: bootcamp.length,
        pagination, 
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
    // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        // return res.status(400).json({success: false});
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    };

    bootcamp.remove();

    res.status(200).json({
        success: true,
        data: {}
    });  
});


//  @desc Get bootcamps within a radius
//  @route GET /api/v1/bootcamps/radious/:zipcode/:distance
//  @access Private
exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
    const {zipcode, distance} = req.params;
    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radiaus = 3,963 mi / 6,378 km
    const radius = distance / 6378;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [ [ lng , lat  ], radius ] }}
    });
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});