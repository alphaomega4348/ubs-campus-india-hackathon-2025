import React from 'react';
import UserCard from '../components/UserCard';

const teamMembers = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
];

function About() {
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">About Us</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {teamMembers.map((member, index) => (
          <UserCard key={index} name={member.name} image={member.image} />
        ))}
      </div>
    </div>
  );
}

export default About;