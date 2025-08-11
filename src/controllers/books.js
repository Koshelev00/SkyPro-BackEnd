const Book = require("../models/book");

const getBooks = (request, response) => {
  return Book.find({})
    .then((data) => {
      response.status(200).send(data);
    })
    .catch((err) => response.status(500).send(err.message));
};

const getBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findById(book_id)
    .then((book) => {
      if (!book) return response.status(404).send("Book not found");
      response.status(200).send(book);
    })
    .catch((err) => response.status(500).send(err.message));
};

const updateBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndUpdate(book_id, { ...request.body}, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) return response.status(404).send("Book not found");
      response.status(200).send(updatedBook);
    })
    .catch((err) => response.status(500).send(err.message));
};

const deleteBook = (request, response) => {
  const { book_id } = request.params;
  return Book.findByIdAndDelete(book_id)
    .then(() => {
      response.status(200).send("Success");
    })

    .catch((err) => response.status(500).send(err.message));
};

const createBook = (request, response) => {
  return Book.create({ ...request.body })
    .then((createdBook) => {
      response.status(201).send(createdBook);
    })
    .catch((err) => response.status(500).send(err.message));
};

module.exports = {
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  createBook,
};