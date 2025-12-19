const {ObjectId} = require('mongodb');
const {getDB} = require('../data/connection');

async function getAllRecipes(filters = {}) {
    const db = getDB();
    let query = {};
    
    // Filtracja po czasie
    if (filters.minTime || filters.maxTime) {
        query.required_time = {};
        if (filters.minTime) query.required_time.$gte = parseInt(filters.minTime);
        if (filters.maxTime) query.required_time.$lte = parseInt(filters.maxTime);
    }
    
    // Wyszukiwanie po nazwie (usuń znaki specjalne z zapytania)
    if (filters.search) {
        const sanitize = (s) => {
            if (!s) return '';
            return s.replace(/[^a-zA-Z0-9ąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]/g, '');
        };
        const clean = sanitize(filters.search);
        if (clean) query.recipe_name = { $regex: clean, $options: 'i' };
    }
    
    // Sortowanie
    let sort = {};
    if (filters.sortBy) {
        const sortDir = filters.sortOrder === 'desc' ? -1 : 1;
        sort[filters.sortBy] = sortDir;
    } else {
        sort.createdAt = -1;
    }
    
    return await db.collection('recipes')
        .find(query)
        .sort(sort)
        .toArray();
}

async function getRecipeById(id) {
    const db = getDB();
    return await db.collection('recipes')
    .findOne({_id:new ObjectId(id)});
}

async function addRecipe(recipe_name,description,required_time) {
    const db = getDB();
    await db.collection('recipes')
    .insertOne({recipe_name,description,required_time: parseInt(required_time),createdAt: new Date()});
    
}
async function updateRecipe(id,recipe_name,description,required_time){
    const db = getDB();
    await db.collection('recipes').updateOne(
        {_id: new ObjectId(id)},
        {$set: {recipe_name,description,required_time: parseInt(required_time)}}
    );
}
async function deleteRecipe(id){
    const db = getDB();
    await db.collection('recipes').deleteOne({_id: new ObjectId(id)});
}

module.exports = {getAllRecipes,getRecipeById,addRecipe,updateRecipe,deleteRecipe};