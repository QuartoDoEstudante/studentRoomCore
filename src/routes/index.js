const { Router } = require("express");

const userRoutes = require("./user.routes");

const postRoutes = require("./post.routes");

const routes = Router();

routes.use("/user", userRoutes)
routes.use("/post", postRoutes)

module.exports = routes;