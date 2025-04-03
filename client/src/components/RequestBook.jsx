import React, { useState } from 'react';

function RequestBook({ requestedBooks, setRequestedBooks }) {
  const [newRequest, setNewRequest] = useState({
    bookName: '',
    author: '',
    edition: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleImageUpload = (e) => {
    setNewRequest({ ...newRequest, image: e.target.files[0] });
  };

  const handleRequestBook = () => {
    if (newRequest.bookName.trim() !== '' && newRequest.author.trim() !== '' && newRequest.edition.trim() !== '') {
      setRequestedBooks([...requestedBooks, newRequest]);
      setNewRequest({ bookName: '', author: '', edition: '', image: null });
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Request a Book</h2> */}
      <div className="space-y-4">
        {/* Book Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
          <input
            type="text"
            name="bookName"
            value={newRequest.bookName}
            onChange={handleInputChange}
            placeholder="Enter book name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={newRequest.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Edition Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Edition</label>
          <input
            type="text"
            name="edition"
            value={newRequest.edition}
            onChange={handleInputChange}
            placeholder="Enter edition"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Book Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
      onClick={handleRequestBook}
      className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-amber-300 transition"
    >
  Request Book
</button>
      </div>

      {/* Requested Books List */}
      <h3 className="text-xl font-semibold mt-6">Requested Books</h3>
      <ul className="mt-4 space-y-2">
        {requestedBooks.map((book, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-md shadow-sm border border-gray-300"
          >
            <p><strong>Book Name:</strong> {book.bookName}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Edition:</strong> {book.edition}</p>
            {book.image && (
              <img
                src={URL.createObjectURL(book.image)}
                alt={book.bookName}
                className="mt-2 w-20 h-20 object-cover rounded-md"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RequestBook;