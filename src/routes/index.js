const { Router } = require("express");

const userRoutes = require("./user.routes");
const sessionsRoutes = require("./sessions.routes");

const postRoutes = require("./post.routes");

const routes = Router();


routes.use("/users", userRoutes)
routes.use("/sessions", sessionsRoutes)             
routes.use("/post", postRoutes)


module.exports = routes;