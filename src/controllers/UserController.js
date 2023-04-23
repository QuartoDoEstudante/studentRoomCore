const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash } = require("bcryptjs");

class UserController {

  async create(request, response) {
    const { first_name, last_name, email, password, contact, cpf } = request.body;

    if (![first_name, last_name, email, password, contact, cpf].every(Boolean)) {
      throw new AppError("Preencha todos os campos");
    }
    
    const emailExistent = await knex("users").where({ email }).first();
    if (emailExistent) {
      throw new AppError("Email já cadastrado");
    }
    
    const cpfExistent = await knex("users").where({ cpf }).first();
    if (cpfExistent) {
      throw new AppError("CPF já cadastrado");
    }
    
    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      contact,
      cpf,
    });

    response.json({ first_name, last_name, email, contact, cpf });
  }
  
}

module.exports = UserController;
