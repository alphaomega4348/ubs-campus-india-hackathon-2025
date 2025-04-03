import React from 'react';
import { FaCheckCircle, FaTruck, FaClock } from 'react-icons/fa';

function TrackBookDelivery({ deliveryStatus }) {
  return (
    <section className="p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--primary-color)]">
        Track Book Delivery
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--primary-color)] text-white">
            <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium">
              Book
            </th>
            <th className="border border-gray-300 px-4 py-3 text-left text-sm font-medium">
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
              <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                {item.book}
              </td>
              <td className="border border-gray-300 px-4 py-3 text-sm font-semibold flex items-center space-x-2">
                {item.status === 'Delivered' && (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-green-600">{item.status}</span>
                  </>
                )}
                {item.status === 'In Transit' && (
                  <>
                    <FaTruck className="text-yellow-500" />
                    <span className="text-yellow-600">{item.status}</span>
                  </>
                )}
                {item.status === 'Pending' && (
                  <>
                    <FaClock className="text-gray-500" />
                    <span className="text-gray-600">{item.status}</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TrackBookDelivery;