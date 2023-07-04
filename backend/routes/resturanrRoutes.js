// Importing Router from express
const {Router} = require("express");
// Creating an instance of Router
const router = Router();

// Importing controller functions
const {getAllResturants, addResturant, searchResturants, updateResturant, deleteResturant} = require ("../controllers/restarauntController");

// Setting up routes for note operations
router.post("/searchResturants", searchResturants);
router.post("/addResturant", addResturant);
router.post("/updateResturant", updateResturant);
router.post("/deleteResturant", deleteResturant);

// Exporting router to be used in other parts of the application
module.exports = router;