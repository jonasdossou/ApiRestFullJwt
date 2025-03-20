const express = require('express');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();
const port = 3000;


// Connexion à la base de donné
connectDB();


// Middleware permet de traiter les données de la request
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Aller chercher toutes les routes 
app.use("/book", require("./routes/bookRoutes"));





app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});