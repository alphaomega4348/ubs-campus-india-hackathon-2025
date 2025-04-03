import React, { useState } from 'react';
import SchoolCard from '../admin/SchoolCard';

const hardcodedSchools = [
  {
    _id: '1',
    name: 'Sunshine Public School',
    email: 'sunshine@example.com',
    address: 'Sector 22, Noida'
  },
  {
    _id: '2',
    name: 'Green Valley High',
    email: 'greenvalley@example.com',
    address: 'MG Road, Bengaluru'
  },
  {
    _id: '3',
    name: 'Harmony Primary School',
    email: 'harmony@example.com',
    address: 'Park Street, Kolkata'
  },
  {
    _id: '4',
    name: 'Silver Oak School',
    email: 'silveroak@example.com',
    address: 'Noida Extension, Noida'
  }
];

const AdminSchools = () => {
  const [schools, setSchools] = useState(hardcodedSchools);
  const [filter, setFilter] = useState('');

  const handleApprove = (id) => {
    setSchools(prev => prev.filter(s => s._id !== id));
    alert(`✅ Approved school with ID: ${id}`);
  };

  const handleReject = (id) => {
    setSchools(prev => prev.filter(s => s._id !== id));
    alert(`❌ Rejected school with ID: ${id}`);
  };

  const filteredSchools = schools.filter(school =>
    school.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🏫 Pending School Approvals</h1>
      <p className="text-gray-600 mb-4">Pending Schools: <strong>{filteredSchools.length}</strong></p>

      <input
        type="text"
        placeholder="Search by city..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full md:w-80 mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
      />

      {filteredSchools.length === 0 ? (
        <p className="text-green-600">🎉 All schools have been approved or filtered out!</p>
      ) : (
        <div className="space-y-4">
          {filteredSchools.map(school => (
            <SchoolCard
              key={school._id}
              school={school}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSchools;
