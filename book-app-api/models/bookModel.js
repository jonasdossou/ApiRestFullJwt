const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    { 
        livre: { type: String, required: true, uppercase: true },
        authors: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
        publishedYear: Number, 
        genre: String,
    },
    {
        timestamps: true
    }
); 

const book = mongoose.model("book", bookSchema);
module.exports = book; 


const authorSchema = new mongoose.Schema(
    { 
        name: { type: String, required: true},
        bio: String,
    }
); 
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;