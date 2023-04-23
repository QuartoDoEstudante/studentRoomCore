const { Router } = require('express');

const PostController = require('../controllers/PostController');

const postRoutes = Router();

const postController = new PostController();

postRoutes.post('/create', postController.create);

postRoutes.post('/delete/', postController.delete);

module.exports = postRoutes;