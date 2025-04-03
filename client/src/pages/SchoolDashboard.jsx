import React, { useState } from 'react';
import AvailableBooks from '../components/AvailableBooks';
import RequestBook from '../components/RequestBook';
import TrackBookDelivery from '../components/TrackBookDelivery';

function SchoolDashboard() {
  const [requestedBooks, setRequestedBooks] = useState([]);
  const [availableBooks] = useState([
    'Mathematics Grade 10',
    'Science Grade 9',
    'History Grade 8',
    'English Literature Grade 11',
  ]);
  const [deliveryStatus] = useState([
    { book: 'Physics Grade 12', status: 'In Transit' },
    { book: 'Chemistry Grade 11', status: 'Delivered' },
  ]);

  return (
    <div className="min-h-screen bg-[var(--background-color)] font-sans">
      {/* Header */}
      <header className="navbar">
        <h1>School Dashboard</h1>
        <nav>
          <a href="#available-books">Available Books</a>
          <a href="#request-book">Request a Book</a>
          <a href="#track-delivery">Track Delivery</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 space-y-8">
        {/* Available Books Section */}
        <section id="available-books" className="card">
          <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Available Books</h2>
          <AvailableBooks availableBooks={availableBooks} />
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