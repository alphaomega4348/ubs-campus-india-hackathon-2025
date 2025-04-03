import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([
    { 
      donation_id: 1, 
      title: 'Harry Potter and the Philosopher\'s Stone', 
      status: 'pending',
      condition: 'Good',
      quantity: 2,
      gradeLevel: 'Middle School',
      category: 'Fiction',
      date: '2025-03-15'
    },
    { 
      donation_id: 2, 
      title: 'The Cat in the Hat', 
      status: 'delivered',
      condition: 'Like New',
      quantity: 1,
      gradeLevel: 'Elementary',
      category: 'Children',
      date: '2025-02-28'
    },
    { 
      donation_id: 3, 
      title: 'To Kill a Mockingbird', 
      status: 'pending',
      condition: 'Fair',
      quantity: 3,
      gradeLevel: 'High School',
      category: 'Classic Literature',
      date: '2025-03-21'
    },
    { 
      donation_id: 4, 
      title: 'The Great Gatsby', 
      status: 'delivered',
      condition: 'Good',
      quantity: 1,
      gradeLevel: 'High School',
      category: 'Classic Literature',
      date: '2025-01-15'
    },
    { 
      donation_id: 5, 
      title: 'Charlotte\'s Web', 
      status: 'in transit',
      condition: 'Like New',
      quantity: 5,
      gradeLevel: 'Elementary',
      category: 'Children',
      date: '2025-03-18'
    }
  ]);
  
  const [newDonation, setNewDonation] = useState({
    title: '',
    condition: '',
    quantity: 1,
    gradeLevel: '',
    language: 'English',
    category: '',
    location: '',
    image: '',
  });

  useEffect(() => {
    // Commented out the actual API call to use our dummy data
    // axios.get('/donors/{donor_id}/donations')
    //   .then(res => {
    //     const donationsData = Array.isArray(res.data) ? res.data : [];
    //     setDonations(donationsData);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes, add to local state instead of API call
    const newId = donations.length > 0 ? Math.max(...donations.map(d => d.donation_id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    
    const donationToAdd = {
      ...newDonation,
      donation_id: newId,
      status: 'pending',
      date: today
    };
    
    setDonations([...donations, donationToAdd]);
    
    // Reset form
    setNewDonation({
      title: '',
      condition: '',
      quantity: 1,
      gradeLevel: '',
      language: 'English',
      category: '',
      location: '',
      image: '',
    });
    
    alert('Donation added successfully!');
    
    // Commented out actual API call
    // axios.post('/books/donate', newDonation)
    //   .then(() => {
    //     alert('Donation added successfully!');
    //     axios.get('/donors/{donor_id}/donations')
    //       .then(res => {
    //         const donationsData = Array.isArray(res.data) ? res.data : [];
    //         setDonations(donationsData);
    //       })
    //       .catch(err => console.error(err));
    //   })
    //   .catch(err => console.error(err));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-orange-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in transit': return 'bg-blue-50 text-blue-700';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5 font-sans text-gray-800">
      <header className="text-center mb-8 pb-5 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Donor Dashboard</h1>
        <p className="text-lg text-gray-500">Thank you for your generosity! Your donations make a difference.</p>
      </header>
      
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-blue-500 inline-block">
          Donate Books
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="font-semibold text-sm text-gray-700 mb-1">
              Book Title
            </label>
            <input 
              type="text" 
              id="title"
              placeholder="Title" 
              value={newDonation.title}
              onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })} 
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="condition" className="font-semibold text-sm text-gray-700 mb-1">
                Condition
              </label>
              <select 
                id="condition"
                value={newDonation.condition}
                onChange={(e) => setNewDonation({ ...newDonation, condition: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select condition</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            
            <div className="flex flex-col flex-1">
              <label htmlFor="quantity" className="font-semibold text-sm text-gray-700 mb-1">
                Quantity
              </label>
              <input 
                type="number" 
                id="quantity"
                min="1" 
                value={newDonation.quantity}
                onChange={(e) => setNewDonation({ ...newDonation, quantity: parseInt(e.target.value) })}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="gradeLevel" className="font-semibold text-sm text-gray-700 mb-1">
                Grade Level
              </label>
              <select 
                id="gradeLevel"
                value={newDonation.gradeLevel}
                onChange={(e) => setNewDonation({ ...newDonation, gradeLevel: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select grade level</option>
                <option value="Pre-K">Pre-K</option>
                <option value="Elementary">Elementary</option>
                <option value="Middle School">Middle School</option>
                <option value="High School">High School</option>
                <option value="College">College</option>
              </select>
            </div>
            
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="font-semibold text-sm text-gray-700 mb-1">
                Category
              </label>
              <select 
                id="category"
                value={newDonation.category}
                onChange={(e) => setNewDonation({ ...newDonation, category: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Children">Children</option>
                <option value="Textbook">Textbook</option>
                <option value="Classic Literature">Classic Literature</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Mystery">Mystery</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-5 rounded-md font-semibold text-base transition-colors duration-200 self-start mt-3"
          >
            Donate Books
          </button>
        </form>
      </section>
      
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-blue-500 inline-block">
          My Donations
        </h2>
        {Array.isArray(donations) && donations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Book Title</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Quantity</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Condition</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Grade Level</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Category</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Date</th>
                  <th className="p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map(donation => (
                  <tr key={donation.donation_id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-200 font-medium text-gray-800">{donation.title}</td>
                    <td className="p-3 border-b border-gray-200">{donation.quantity}</td>
                    <td className="p-3 border-b border-gray-200">{donation.condition}</td>
                    <td className="p-3 border-b border-gray-200">{donation.gradeLevel}</td>
                    <td className="p-3 border-b border-gray-200">{donation.category}</td>
                    <td className="p-3 border-b border-gray-200">{donation.date}</td>
                    <td className="p-3 border-b border-gray-200">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClass(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 rounded-md text-gray-500">
            <p>No donations found. Start donating books today!</p>
          </div>
        )}
      </section>
      
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <h3 className="text-gray-500 text-base mb-2">Total Donations</h3>
          <div className="text-4xl font-bold text-blue-500">{donations.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <h3 className="text-gray-500 text-base mb-2">Books Donated</h3>
          <div className="text-4xl font-bold text-blue-500">{donations.reduce((total, donation) => total + donation.quantity, 0)}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <h3 className="text-gray-500 text-base mb-2">Pending</h3>
          <div className="text-4xl font-bold text-blue-500">{donations.filter(d => d.status === 'pending').length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-5 text-center">
          <h3 className="text-gray-500 text-base mb-2">Delivered</h3>
          <div className="text-4xl font-bold text-blue-500">{donations.filter(d => d.status === 'delivered').length}</div>
        </div>
      </section>
    </div>
  );
};

export default DonorDashboard;

