const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");
const propertyRoutes = require("./property.routes");

const routes = Router();


routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)             
routes.use("/property", propertyRoutes)


module.exports = routes;
