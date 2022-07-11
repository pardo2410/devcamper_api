const express = require("express");
// call the methods created folder controllers
const {
    getBootcamps, 
    getBootcamp, 
    createBootcamp, 
    updateBootcamp, 
    deleteBootcamp
} = require("../controllers/bootcamps");

const router = express.Router();

// Use the controllers for the routes
router
    .route("/")
    .get(getBootcamps)
    .post(createBootcamp);
router
    .route("/:id")
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;







// -------------------------------------------------------------------------------------------

// router.get("/",(req,res) =>{
//     // res.send("<h1>Hello World!</h1>");
//     // res.send({
//     //     name:'David',
//     //     age:25
//     // });
//     // res.json({
//     //     name:"David",
//     //     age:25
//     // });
    
//     // Send menssage error using json
//     // res.sendStatus(400);
//     // res.status(400).json({
//     //     success: false,
//     //     error: "Bad Request"
//     // });
//     res.status(200).json({
//         success: true, 
//         data: {
//             id: 1,
//             name: "David",
//             age: 25
//         }
//     });
// });

// router.get("/", (req, res) =>{
//     res.status(200).json({success: true, msg:"Show all bootcamps"});
// });
// router.get("/:id", (req, res) =>{
//     res.status(200).json({success: true, msg: `Get bootcamp with the id ${req.params.id}`});
// });
// router.post("/", (req, res) =>{
//     res.status(200).json({success: true, msg: "Create new bootcamp"});
// });
// router.put("/:id", (req, res) =>{
//     res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`});
// });
// router.delete("/:id", (req, res) =>{
//     res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`});
// });

// router.get("/", (req, res) =>{
//     res.send("ok - courses route");
// });
// router.get("/api/v1/reviews", (req, res) =>{
//     res.send("ok - reviews route");
// });
// router.get("/api/v1/auth", (req, res) =>{
//     res.send("ok - auth route");
// });
// router.get("/api/v1/users", (req, res) =>{
//     res.send("ok - users route");
// });


