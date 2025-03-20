const express = require('express');
const { setBooks, getBooks, editBooks, deleteBooks } = require('../controllers/bookControllers');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware');


// Routes publiques
router.get("/", getBooks);
router.get("/:id", getBooks);

// Routes protégées 
router.post("/", authMiddleware, setBooks);
router.put("/:id", authMiddleware, editBooks);
router.delete("/:id", authMiddleware, deleteBooks);

// Routes d'authentification
// router.post('/register', authController.register);
// router.post('/login', authController.login);


module.exports = router;