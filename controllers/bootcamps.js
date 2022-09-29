const path = require("path");
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
    res.status(200).json(res.advancedResults);
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


//  @desc Upload photo for bootcamp
//  @route PUT /api/v1/bootcamp/:id/photo
//  @access Private

exports.bootcampPhotoUpload = asyncHandler( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    if( !req.files ){
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    
    // console.log(req.files.file);
    const file = req.files.file;

    // Make sure the image is a phto
    if(!file.mimetype.startsWith("image")){
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD){
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`, 400));
    }

    // Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err =>{
        if(err){
            console.error(err);
            return next(
                new ErrorResponse(`Problem with file upload`, 500)
            )
        }
        await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
        res.status(200).json({
            success: true,
            data: file.name
        }); 
    });
});
