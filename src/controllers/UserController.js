const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;
    console.log("oi");

    if (!name) {
      throw new AppError("O nome é obrigatório");
    }

    await knex("users").insert({
      name,
      email,
      password,
    });

    response.json({ name, email, password });
  }
}

module.exports = UserController;
