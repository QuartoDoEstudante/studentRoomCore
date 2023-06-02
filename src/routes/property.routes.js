const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const PropertyController = require("../controllers/PropertyController");
const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const propertyRoutes = Router()

const upload = multer(uploadConfig.MULTER);

const propertyController = new PropertyController();


propertyRoutes.post("/create", propertyController.create);


module.exports = propertyRoutes;


