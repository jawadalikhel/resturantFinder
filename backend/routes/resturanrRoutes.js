// Importing Router from express
const {Router} = require("express");
// Creating an instance of Router
const router = Router();

// Importing controller functions
const {getAllResturants, addResturant, searchResturant, updateResturant, deleteResturant} = require ("../controllers/restarauntController");

// Setting up routes for note operations
router.get("/", getAllResturants);
router.post("/addResturant", addResturant);
router.post("/searchResturant", searchResturant);
router.post("/updateResturant", updateResturant);
router.post("/deleteResturant", deleteResturant);

// Exporting router to be used in other parts of the application
module.exports = router;