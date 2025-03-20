const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect('mongodb://localhost:27017/biblio')
          .then(() => {console.log("MongoDB connecté");})
          .catch(err => {console.error("Erreur de connexion", err);});
    } catch (error) {
        console.log("error");
        // process.exit();
    }
};



module.exports = connectDB;