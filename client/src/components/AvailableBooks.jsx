import React from 'react';

function AvailableBooks({ availableBooks, addToCart }) {
  return (
    <section className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availableBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={`https://via.placeholder.com/150?text=${encodeURIComponent(book.name)}`}
              alt={book.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{book.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Author: <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Quantity: <span className="font-medium">{book.quantity}</span>
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => addToCart(book)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AvailableBooks;