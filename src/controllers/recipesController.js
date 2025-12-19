const recipesModel = require('../models/recipesModels');
const commentsModel = require('../models/commentsModels');

async function getAllRecipes(req,res){
    try {
        const filters = {
            search: req.query.search || '',
            minTime: req.query.minTime || '',
            maxTime: req.query.maxTime || '',
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc'
        };
        
        const recipes = await recipesModel.getAllRecipes(filters);

        res.render('pages/show',{ recipes, filters, error: null });
    } catch (error) {
        res.render('pages/show', { recipes: [], filters: {}, error: error.message });
    }
}
async function getAddForm(req,res){
    res.render('pages/new', { error: null });
}

async function showRecipe(req,res){
    const recipe = await recipesModel.getRecipeById(req.params.id);
    const comments = await commentsModel.getCommentsByRecipeId(req.params.id);
    res.render('pages/details', {recipe, comments});
}


async function postAdd(req,res){
    try {
        const { recipe_name, description, required_time } = req.body;

        // Walidacja
        if (!recipe_name || recipe_name.trim().length < 3) {
            return res.render('pages/new', { error: 'Nazwa przepisu musi mieć co najmniej 3 znaki' });
        }
        if (!description || description.trim().length < 10) {
            return res.render('pages/new', { error: 'Opis musi mieć co najmniej 10 znaków' });
        }
        if (!required_time || parseInt(required_time) <= 0) {
            return res.render('pages/new', { error: 'Czas musi być dodatnim numerem' });
        }

        await recipesModel.addRecipe(recipe_name, description, required_time);
        res.redirect('/');
    } catch (error) {
        res.render('pages/new', { error: error.message });
    }
}

async function getEditForm(req,res){
    try {
        const recipe = await recipesModel.getRecipeById(req.params.id);
        if (!recipe) {
            return res.status(404).render('pages/error', { message: 'Przepis nie znaleziony' });
        }
        res.render('pages/edit', {recipe, error: null});
    } catch (error) {
        res.status(500).render('pages/error', { message: error.message });
    }
}

async function postEdit(req,res) {
    try {
        const { recipe_name, description, required_time } = req.body;

        // Walidacja
        if (!recipe_name || recipe_name.trim().length < 3) {
            const recipe = await recipesModel.getRecipeById(req.params.id);
            return res.render('pages/edit', { recipe, error: 'Nazwa przepisu musi mieć co najmniej 3 znaki' });
        }
        if (!description || description.trim().length < 10) {
            const recipe = await recipesModel.getRecipeById(req.params.id);
            return res.render('pages/edit', { recipe, error: 'Opis musi mieć co najmniej 10 znaków' });
        }
        if (!required_time || parseInt(required_time) <= 0) {
            const recipe = await recipesModel.getRecipeById(req.params.id);
            return res.render('pages/edit', { recipe, error: 'Czas musi być dodatnim numerem' });
        }

        await recipesModel.updateRecipe(req.params.id, recipe_name, description, required_time);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('pages/error', { message: error.message });
    }
}

async function deleteRecipe(req,res){
    try {
        await recipesModel.deleteRecipe(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('pages/error', { message: error.message });
    }
}

module.exports = {getAllRecipes,getAddForm,postAdd,getEditForm,postEdit,deleteRecipe,showRecipe};