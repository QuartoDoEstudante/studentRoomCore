const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const mime = require('mime-types');

class PropertyController {

  async create(request, response) {
     const property = JSON.parse(request.body.data) ;
      const 
      { 
        title,
        description,
        type,
        value,
        contact,
        available,
        road, 
        number, 
        cep, 
        neighborhood 
      } = property;

      const user_id = request.user.id;

      const diskStorage = new DiskStorage();

      if(!request.files || request.files.length === 0){
        throw new AppError("É necessário enviar pelo menos uma imagem.");
      }

      if(!title) {
        throw new AppError("É necessário enviar um título.");
      }
      if(!description) {
        throw new AppError("É necessário enviar uma descrição.");
      }
      if(!type) {
        throw new AppError("É necessário enviar um tipo."); 
      }
      if(!value) {
        throw new AppError("É necessário enviar um valor.");
      }
      if(!contact) {
        throw new AppError("É necessário enviar um contato.");
      }
      if(!available) {
        throw new AppError("É necessário enviar a disponibilidade.");
      }
      if(!road) {
        throw new AppError("É necessário enviar a rua.");
      }
      if(!number) {
        throw new AppError("É necessário enviar o número.");
      }
      if(!cep) {
        throw new AppError("É necessário enviar o CEP.");
      }
      if(!neighborhood) {
        throw new AppError("É necessário enviar o bairro.");
      }
      


      const filePromises = request.files.map(async (file) => {
        const mimeType = mime.lookup(file.path);
        if (!mimeType || !mimeType.startsWith('image/')) {
          throw new AppError('Arquivo não é uma imagem.');
        }
      });

      try{
        await Promise.all(filePromises);

        const insertedProperty = await knex("property").insert({
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
        }).returning("id");

        const propertyId = insertedProperty[0];

        for (const file of request.files) {
          const filename = await diskStorage.saveFile(file.filename);
          await knex("photos").insert({ photo: filename, property: propertyId.id });
        }
  
        response.json({ title, description});

      } catch (error) {
          throw new AppError(error.message);
      }
      
  }

  async show(request, response) {
    const { id } = request.params;

    const property = await knex("property").where({ id }).first();

    if(!property) {
      throw new AppError("Imóvel não encontrado.");
    }

    const photos = await knex("photos").where({ property: id });

    response.json({ property, photos });
  }

  async index(request, response) {
    const { type, value } = request.query;

    const properties = type? await knex("property").where({ type }).whereLike("value", `%${value}%`) : await knex("property").whereLike("value", `%${value}%`);
    

    response.json(properties);
  }

  async delete(request, response) {
    const { id } = request.params;

    const property = await knex("property").where({ id }).first();

    if(!property) {
      throw new AppError("Imóvel não encontrado.");
    }
    await knex("photos").where({ property: id }).del();

    await knex("assessments").where({ property: id }).del();

    await knex("property").where({ id }).del();

    response.json({ message: "Imóvel deletado com sucesso." });
  }


}

module.exports = PropertyController;