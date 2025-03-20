
const Book = require('../models/bookModel')
const Author = require('../models/authorModel')


// Créer un livre
module.exports.createBook = async (req, res) =>{
    try {
        const { livre, authors, publishedYear, genre } = req.body;
        if (!livre || !authors) {
            return res.status(400).json({ message: 'Livre et auteur sont requis' });
        }

        const author = await Author.findById(authors);
        if (!author) {
            return res.status(400).json({ message: 'Auteur introuvable' });
        }

        const newBook = new Book({ livre, authors, publishedYear, genre });
        await newBook.save();
        res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}

// Lire tous les livres 
module.exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('authors');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
    // if (req.params.id) {
    //     const book = await BookModel.findById(req.params.id);
    //     if (!book) {
    //         return res.status(404).json({ livre: "Livre non trouvé" });
    //     }
    //     return res.status(200).json(book);
    // }
    // const books = await BookModel.find();
    // res.status(200).json(books);
};

// Lire un livre par son ID
module.exports.getBookById = async (req, res) =>{
    try {
        const book = await Book.findById(req.params.id).populate('authors');
        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
}

// Modifier un livre
module.exports.updateBook = async (req, res)  => {
    try {
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updateBook) {
            return res.status(404).json({message: "N'existe pas"});
        }
        // const updateBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidate: true})
        res.status(200).json(updateBook);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Supprimer un livre
module.exports.deleteBook = async (req, res)  => {
    try {
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
        if (!deleteBook) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json("Supprimé avec succès");
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};



// module.exports.getAutBooks = async (req, res)  =>{
//     const books = await BookModel.find().populate('author');
//     res.status(200).json(books);
// };


// module.exports.setBooks = async (req, res)  => {
//     if (!req.body.livre) {
//         return res.status(400).json({livre: "Veuillez ajouter un livre"});
//     }
//     const post = await BookModel.create({
//         livre: req.body.livre, 
//         authors: req.body.authors
//     });
//     res.status(200).json(post);
// };
