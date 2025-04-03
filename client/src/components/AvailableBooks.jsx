import React from 'react';

function AvailableBooks({ availableBooks }) {
  return (
    <section className="p-6">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Available Books</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availableBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={`https://via.placeholder.com/150?text=${encodeURIComponent(book)}`}
              alt={book}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{book}</h3>
              <p className="text-sm text-gray-600">
                This is a brief description of the book. Add more details here.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AvailableBooks;