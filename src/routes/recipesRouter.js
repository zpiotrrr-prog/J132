const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipesController');
const commentsController = require('../controllers/commentsController');

router.get('', recipeController.getAllRecipes);
router.get('/recipe/new', recipeController.getAddForm);
router.post('/recipe/new', recipeController.postAdd);
router.get('/recipe/:id/edit',recipeController.getEditForm);
router.post('/recipe/:id/edit' , recipeController.postEdit);
router.post('/recipe/:id/delete', recipeController.deleteRecipe)
router.get('/recipe/:id/details', recipeController.showRecipe);


router.post('/comment', commentsController.postComment);
router.post('/comment/:commentId/delete', commentsController.deleteComment);

module.exports = router;