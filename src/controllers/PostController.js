const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class PostController {
    async create(request, response) {
        try{
            const { author, title, description, type, contact, propiedade } = request.body;

            const post_exit = await knex("post").select("*").where("propiedade", propiedade);

            if (post_exit != "") {
                throw new AppError("Propriedade já cadastrada");
            }

            if (!title) {
                throw new AppError("O título é obrigatório");
            }

            if (!description) {
                throw new AppError("A descrição é obrigatória");
            }

            if (!type) {
                throw new AppError("O tipo é obrigatório");
            }

            const propriedade = await knex("property").select("id", "value").where("id", propiedade).first();

            if(!propriedade) {
                throw new AppError("Propriedade não encontrada");
            }

            const propriedade_value = propriedade.value;
            const propriedade_id = propriedade.id;

            if (!propriedade.value) {
                throw new AppError("O valor é obrigatório");
            }

            await knex("post").insert({ author, title, description, type, value: propriedade.value, contact, propiedade: propriedade.id });
            
            return response.status(200).json({ author, title, description, type, propriedade_value, contact, propriedade_id });
            // O retorno do json ainda vou tirar, só pra testar -> Remover depois
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    //delete post
    async delete(request, response) {
        try{
            const { id , user} = request.body;

            const post = await knex("post").select("*").where("id", id).first();

            if (!post) {
                throw new AppError("Post não encontrado");
            }

            if(post.author != user) {
                throw new AppError("Você não tem permissão para deletar esse post");
            }

            await knex("post").where("id", id).del();

            return response.status(200).json({ post, message: "Post deletado com sucesso" }); // retorna o post deletado -> Remover depois
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

module.exports = PostController;