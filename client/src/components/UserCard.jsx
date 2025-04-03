import React from 'react';

function UserCard({ name, image }) {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
}

export default UserCard;