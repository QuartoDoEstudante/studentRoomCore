const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class PropertyController {

  async create(request, response) {
    const { 
      title, 
      description, 
      type, 
      value, 
      contact, 
      available, 
      road, 
      number, 
      cep, 
      neighborhood } = request.body;
      const user_id = request.user.id;

      if (![title, description, type, value, contact, available, road, number, cep, neighborhood].every(Boolean)) {
        throw new AppError("Preencha todos os campos");
      }

      await knex("property").insert({
        owner: user_id,
        title,
        description,
        type,
        value,
        contact,
        available,
        road,
        number,
        cep,
        neighborhood,
      });

      response.json({ title, description});
  }


}

module.exports = PropertyController;