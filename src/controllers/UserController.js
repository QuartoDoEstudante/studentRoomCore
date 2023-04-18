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

  async posts(request, response) {
    try {
        const { author } = request.body;
        const posts = await knex("post").select("*").where("author", author);
        if (!posts) {
            throw new AppError("Não há posts cadastrados");
        }
        return response.json(posts);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
