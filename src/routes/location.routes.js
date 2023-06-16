const { Router } = require("express");

const LocationController = require("../controllers/LocationController");
const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const locationRoutes = Router()

const locationController = new LocationController();

locationRoutes.post("/create/:property_id", ensureAuthenticated, locationController.create);
locationRoutes.get("/index", ensureAuthenticated, locationController.index);
locationRoutes.delete("/delete/:location_id", ensureAuthenticated, locationController.delete);

module.exports = locationRoutes;