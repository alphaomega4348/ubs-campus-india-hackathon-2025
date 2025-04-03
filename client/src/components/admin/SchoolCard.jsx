import React from 'react';

const SchoolCard = ({ school, onApprove, onReject }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">{school.name}</h3>
      <p className="text-sm text-gray-600"><strong>Email:</strong> {school.email}</p>
      <p className="text-sm text-gray-600"><strong>Address:</strong> {school.address}</p>

      <div className="mt-4 flex gap-3">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => onApprove(school._id)}
        >
          Approve ✅
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => onReject(school._id)}
        >
          Reject ❌
        </button>
      </div>
    </div>
  );
};

export default SchoolCard;
