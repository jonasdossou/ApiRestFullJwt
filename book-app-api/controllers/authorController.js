

const Author = require('../models/authorModel');


// Créer un auteur
module.exports.createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Nom de l\'auteur requis' });
        }

        const newAuthor = new Author({ name, bio });
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


// Lire tous les auteurs
module.exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


// Lire un auteur par ID
module.exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


// Modifier un auteur
module.exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};


// Supprimer un auteur
module.exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json({ message: 'Auteur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};