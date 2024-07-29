const Book = require('../models/Book');
const User = require('../models/User');

const createBook = async (req, res) => {
    const { name } = req.body;
    const userId = req.user._id;

    try {
        const book = await Book.create({
            name,
            creator: userId
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('creator', 'username');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const favoriteBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user._id;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Kitap bulunamadı!' });
        }

        if (book.creator.toString() === userId.toString()) {
            return res.status(400).json({ message: 'Kendi kitabınızı favorilere ekleyemezsiniz!' });
        }

        const user = await User.findById(userId);
        if (user.favorites.length >= 10) {
            return res.status(400).json({ message: 'Max 10 kitap favorilerinize ekleyebilirsiniz!' });
        }

        if (user.favorites.includes(bookId)) {
            return res.status(400).json({ message: 'Bu kitap zaten favorilerde!' });
        }

        user.favorites.push(bookId);
        await user.save();

        book.favoritedBy.push(userId);
        await book.save();

        res.json({ message: 'Kitap favorilere eklendi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listFavoriteBooks = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate({
            path: 'favorites',
            populate: { path: 'creator', select: 'username' }
        });

        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBook,
    listBooks,
    favoriteBook,
    listFavoriteBooks
};
