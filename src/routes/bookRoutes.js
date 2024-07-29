const express = require('express');
const {
    createBook,
    listBooks,
    favoriteBook,
    listFavoriteBooks
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBook);
router.get('/', listBooks);
router.post('/favorite', protect, favoriteBook);
router.get('/favorites', protect, listFavoriteBooks);

module.exports = router;
