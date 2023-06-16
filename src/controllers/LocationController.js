const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { user } = require("pg/lib/defaults");

class LocationController {

  async create(request, response){
    const user_id = request.user.id;

    const { renter_id, contract_start, contract_end, value } = request.body;

    const { property_id } = request.params;

    const property = await knex("property").where({ id: property_id }).first();

    if(!property){
      throw new AppError("Property not found", 404);
    }

    if(property.owner !== user_id){
      throw new AppError("You are not allowed to create a location for this property", 401);  
    }

    const location = await knex("location").insert({
      renter_id: renter_id,
      locator: user_id,
      property_id: property_id,
      contract_start,
      contract_end,
      value
    });

    return response.json();
    
  }

  async index(request, response){
    const user_id = request.user.id;

    const locations = await knex("location").where({ locator: user_id });

    return response.json(locations);
  }

  async delete(request, response){
    const user_id = request.user.id;

    const { location_id } = request.params;

    const location = await knex("location").where({ id: location_id }).first();

    if(!location){
      throw new AppError("Location not found", 404);
    }

    if(location.locator !== user_id){
      throw new AppError("You are not allowed to delete this location", 401);  
    }

    await knex("location").where({ id: location_id }).delete();

    return response.status(204).send();
  }


}

module.exports = LocationController;