const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Borrowing = require('./models/Borrowing');

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/v1/books', async (request, response, next) => {
    try {
        const dbBooks = await Book.find();
        response.status(200).json(dbBooks);
    } catch (error) { next(error); }
});

app.get('/api/v1/borrowings', async (request, response, next) => {
    try {
        const dbBorrowings = await Borrowing.find().populate('bookId memberId');
        response.status(200).json(dbBorrowings);
    } catch (error) { next(error); }
});

app.post('/api/v1/borrowings', async (request, response, next) => {
    try {
        const borrowing = await Borrowing.create(request.body);
        response.status(201).json(borrowing);
    } catch (error) { next(error); }
});

app.post('/api/v1/borrowings/request', async (request, response, next) => {
    try {
        const { memberName, bookTitle, borrowDate, returnDate } = request.body;
        if (!memberName || !bookTitle || !borrowDate || !returnDate) {
            const error = new Error('memberName, bookTitle, borrowDate and returnDate are required.');
            error.statusCode = 400;
            throw error;
        }

        const email = `${memberName.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@library.local`;
        const member = await Member.findOneAndUpdate(
            { email },
            { name: memberName, email, department: 'Student' },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        const book = await Book.findOneAndUpdate(
            { title: bookTitle },
            { title: bookTitle, author: 'Library submission', category: 'General', available: false },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        const borrowing = await Borrowing.create({ memberId: member._id, bookId: book._id, borrowDate, returnDate });
        response.status(201).json({ success: true, data: await borrowing.populate('memberId bookId') });
    } catch (error) { next(error); }
});

// MongoDB demonstration: create a book and return validation failures as JSON.
app.post('/api/v1/db/books', async (request, response, next) => {
    try {
        const book = await Book.create(request.body);
        response.status(201).json({ success: true, data: book });
    } catch (error) { next(error); }
});
app.post('/api/v1/db/members', async (request, response, next) => {
    try {
        const member = await Member.create(request.body);
        response.status(201).json({ success: true, data: member });
    } catch (error) { next(error); }
});
app.post('/api/v1/db/borrowings', async (request, response, next) => {
    try {
        const borrowing = await Borrowing.create(request.body);
        response.status(201).json({ success: true, data: borrowing });
    } catch (error) { next(error); }
});

app.use((request, response, next) => {
    const error = new Error(`Route not found: ${request.method} ${request.path}`);
    error.statusCode = 404;
    next(error);
});
app.use(errorHandler);

async function startServer() {
    if (process.env.MONGO_URI) {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } else {
        console.log('MongoDB skipped: add MONGO_URI to .env to enable database routes');
    }
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

if (require.main === module) {
    startServer().catch((error) => {
        console.error('Could not start server:', error.message);
        process.exit(1);
    });
}

module.exports = app;
