

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    { 
        livre: { type: String, required: true, uppercase: true },
        authors: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
        publishedYear: Number, 
        genre: String,
    },
    {
        timestamps: true
    }
); 

const Book = mongoose.model("book", bookSchema);
module.exports = Book; 


