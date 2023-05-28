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

  async update(request, response) {

    const { first_name, last_name, email, password, oldPassword, contact} = request.body;

    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user){
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdateEmail = await knex("users").where({ email }).first();

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id){
      throw new AppError("Email já cadastrado");
    }

    user.first_name = first_name ?? user.first_name;
    user.last_name = last_name ?? user.last_name;
    user.email = email ?? user.email;
    user.contact = contact ?? user.contact;

    if( password && !oldPassword){
      throw new AppError("Senha antiga não informada");
    }

    if( password && oldPassword){
      const passwordMatch = await compare(oldPassword, user.password);

      if (!passwordMatch){
        throw new AppError("Senha antiga incorreta");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id: user_id }).update(user);

    return response.status(200).json();

  }

}

module.exports = UserController;
