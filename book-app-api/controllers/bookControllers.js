const express = require('express');
const book = require('../routes/bookRoutes')


module.exports.getBooks = async (req, res) => {
    if (req.params.id) {
        const book = await BookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ livre: "Livre non trouvé" });
        }
        return res.status(200).json(book);
    }
    const books = await BookModel.find();
    res.status(200).json(books);
};


module.exports.getAutBooks = async (req, res)  =>{
    const books = await BookModel.find().populate('author');
    res.status(200).json(books);
};


module.exports.setBooks = async (req, res)  => {
    if (!req.body.livre) {
        return res.status(400).json({livre: "Veuillez ajouter un livre"});
    }
    const post = await BookModel.create({
        livre: req.body.livre, 
        authors: req.body.authors
    });
    res.status(200).json(post);
};


module.exports.editBooks = async (req, res)  => {
    const books = await BookModel.findById(req.params.id);
    if (!books) {
        res.status(400).json({livre: "N'existe pas"});
    }
    const updateBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidate: true})
    res.status(200).json(updateBook);
};


module.exports.deleteBooks = async (req, res)  => {
    // const books = await BookModel.findByIdAndDelete(req.params.id);
    const books = await BookModel.findById(req.params.id);
    if (!books) {
        res.status(400).json({livre: "Le livre n'existe pas"});
    }
    await books.remove();
    res.status(200).json("Supprimé avec succès");
};



