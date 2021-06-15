var router = require("express").Router();
const event = require("../controllers/eventController.js")
const { addEventValidation } = require("../validations/events/event.validation")


// GET ROUTES 
router.get("/",event.view_all); 
// router.get("/add",event.add_get); 
router.get("/view/:id",event.view_event);

// POST ROUTES
router.post("/add",addEventValidation,event.add_event);

// DELETE ROUTES
router.delete("/delete/:id",event.delete_event);

module.exports = router