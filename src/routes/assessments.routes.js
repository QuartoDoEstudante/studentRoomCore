const { Router } = require("express");

const AssessmentsController = require("../controllers/AssessmentsController");
const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const assessmentsRoutes = Router()

const assessmentsController = new AssessmentsController();

assessmentsRoutes.post("/create", ensureAuthenticated, assessmentsController.create);
assessmentsRoutes.get("/index", assessmentsController.index);
assessmentsRoutes.delete("/delete/:id", ensureAuthenticated, assessmentsController.delete);
assessmentsRoutes.get("/show/:id", assessmentsController.show);

module.exports = assessmentsRoutes;