const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorsRoutes');
const userRoutes = require('./routes/userRoutes');


// Charger les variables d'environnement
dotenv.config();


// Créer l'app Express
const app = express();
const port = 3000;


// Middleware permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Aller chercher toutes les routes 
app.use("/books", bookRoutes);
app.use('/authors', authorRoutes);
app.use('/auth', userRoutes);



app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});