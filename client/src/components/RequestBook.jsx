import React, { useState } from 'react';

function RequestBook({ requestedBooks, setRequestedBooks }) {
  const [newRequest, setNewRequest] = useState({
    bookName: '',
    author: '',
    quantity: '',
    area: 'Rural',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const handleRequestBook = () => {
    if (
      newRequest.bookName.trim() !== '' &&
      newRequest.author.trim() !== '' &&
      newRequest.quantity.trim() !== ''
    ) {
      setRequestedBooks([...requestedBooks, newRequest]);
      setNewRequest({ bookName: '', author: '', quantity: '', area: 'Rural' });
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
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

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Required</label>
          <input
            type="number"
            name="quantity"
            value={newRequest.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity required"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Area Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <select
            name="area"
            value={newRequest.area}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Rural">Rural</option>
            <option value="Urban">Urban</option>
            <option value="Metropolitan">Metropolitan</option>
          </select>
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
            <p><strong>Quantity:</strong> {book.quantity}</p>
            <p><strong>Area:</strong> {book.area}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RequestBook;