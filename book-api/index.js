const express = require('express');
const app = express();

app.use(express.json());

// In-memory data store
let books = [];
let nextId = 1;

/* ---------------- ROUTES ---------------- */

// ✅ GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// ✅ GET single book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// ✅ POST - Add new book
app.post('/books', (req, res) => {
  const { bookid, bookname, bookauthor } = req.body;

  if (!bookname) {
    return res.status(400).json({ error: 'Book name is required' });
  }

  const newBook = {
    id: nextId++,
    bookid,
    bookname,
    bookauthor
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// ✅ PUT - Update book
app.put('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { bookid, bookname, bookauthor } = req.body;

  books[index] = {
    ...books[index],
    bookid,
    bookname,
    bookauthor
  };

  res.json(books[index]);
});

// ✅ DELETE book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(204).send();
});

/* ---------------- SERVER ---------------- */

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});