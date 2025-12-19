const commentsModel = require('../models/commentsModels');

async function postComment(req, res) {
    try {
        const { recipeId, text, username } = req.body;
        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Komentarz nie może być pusty' });
        }

        const usernameToSave = (username && username.trim()) ? username.trim() : 'Anonimowy użytkownik';
        await commentsModel.addComment(recipeId, usernameToSave, text);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;
        await commentsModel.deleteComment(commentId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postComment,
    deleteComment
};
