const {ObjectId} = require('mongodb');
const {getDB} = require('../data/connection');

async function addComment(recipeId, username, text) {
    const db = getDB();
    const doc = {
        recipeId: new ObjectId(recipeId),
        username,
        text,
        createdAt: new Date()
    };

    await db.collection('comments').insertOne(doc);
}

async function getCommentsByRecipeId(recipeId) {
    const db = getDB();
    return await db.collection('comments')
        .find({ recipeId: new ObjectId(recipeId) })
        .sort({ createdAt: -1 })
        .toArray();
}

async function deleteComment(commentId) {
    const db = getDB();
    await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) });
}

module.exports = {
    addComment,
    getCommentsByRecipeId,
    deleteComment
};
