import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon
import AvailableBooks from '../components/AvailableBooks';
import RequestBook from '../components/RequestBook';
import TrackBookDelivery from '../components/TrackBookDelivery';
import Cart from '../components/Cart';

function SchoolDashboard() {
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [availableBooks] = useState([
    { name: 'Mathematics Grade 10', author: 'Author 1', quantity: 10 },
    { name: 'Science Grade 9', author: 'Author 2', quantity: 5 },
    { name: 'History Grade 8', author: 'Author 3', quantity: 8 },
    { name: 'English Literature Grade 11', author: 'Author 4', quantity: 12 },
  ]);
  const [deliveryStatus] = useState([
    { book: 'Physics Grade 12', status: 'In Transit' },
    { book: 'Chemistry Grade 11', status: 'Delivered' },
  ]);
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const removeFromCart = (bookName) => {
    setCart((prevCart) => prevCart.filter((book) => book.name !== bookName));
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)] font-sans">
      {/* Header */}
      <header className="navbar flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">School Dashboard</h1>
        <nav className="flex space-x-4">
          <a href="#available-books">Available Books</a>
          <a href="#request-book">Request a Book</a>
          <a href="#track-delivery">Track Delivery</a>
          <a href="#cart" className="relative">
            <FaShoppingCart className="text-2xl text-gray-700" /> 
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 space-y-8">
        {/* Available Books Section */}
        <section id="available-books" className="card">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Available Books</h2>
          <AvailableBooks availableBooks={availableBooks} addToCart={addToCart} />
        </section>

        

        {/* Request a Book Section */}
        <section id="request-book" className="card">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Request a Book</h2>
          <RequestBook requestedBooks={requestedBooks} setRequestedBooks={setRequestedBooks} />
        </section>

        {/* Track Book Delivery Section */}
        <section id="track-delivery" className="card">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Track Book Delivery</h2>
          <TrackBookDelivery deliveryStatus={deliveryStatus} />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 School Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SchoolDashboard;