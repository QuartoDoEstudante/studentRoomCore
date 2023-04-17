const { Router } = require("express");

const userRoutes = require("./user.routes");

const postRoutes = require("./post.routes");

const routes = Router();

routes.use("/users", userRoutes)
routes.use("/posts", postRoutes)

module.exports = routes;