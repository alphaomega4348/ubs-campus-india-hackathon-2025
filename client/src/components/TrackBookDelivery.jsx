import React from 'react';

function TrackBookDelivery({ deliveryStatus }) {
  return (
    <section className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Track Book Delivery</h2> */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
              Book
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {deliveryStatus.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              } hover:bg-gray-100 transition`}
            >
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                {item.book}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 text-sm font-semibold ${
                  item.status === 'Delivered'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TrackBookDelivery;