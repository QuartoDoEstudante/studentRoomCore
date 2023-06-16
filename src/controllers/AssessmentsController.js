const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class AssessmentsController{
  async create(request, response){
    const user_id = request.user.id;
    const { property_id, note } = request.body;

    const property = await knex("property").where({ id: property_id }).first();

    if(!property){
      throw new AppError("Property not found", 404);
    }

    const assessment = await knex("assessments").insert({
      property: property_id,
      author: user_id,
      note
    });

    return response.json(note);
  }

  async index(request, response){
    const property_id = request.query.property_id;
    const assessments = await knex("assessments").where({ property: property_id });
    return response.json(assessments);
  }

  async delete(request, response){
    const user_id = request.user.id;
    const { id } = request.params;

    const assessment = await knex("assessments").where({ id }).first();

    if(!assessment){
      throw new AppError("Assessment not found", 404);
    }

    if(assessment.author !== user_id){
      throw new AppError("You are not allowed to delete this assessment", 401);
    }

    await knex("assessments").where({ id }).delete();

    return response.status(204).send();
  }

  async show(request, response){
    const { id } = request.params;

    const assessment = await knex("assessments").where({ id }).first();

    if(!assessment){
      throw new AppError("Assessment not found", 404);
    }

    return response.json(assessment);
  }



}

module.exports = AssessmentsController;