

const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookControllers');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware');


// Routes publiques
router.get("/", getBooks);
router.get("/:id", getBookById);

// Routes protégées 
router.post("/", authMiddleware, createBook);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);


module.exports = router;