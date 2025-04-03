import React from 'react';

function Cart({ cart, removeFromCart }) {
  const confirmOrder = async (book) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: book.name,
          author: book.author,
          quantity: book.quantity,
        }),
      });

      if (response.ok) {
        alert(`Order confirmed for: ${book.name}`);
        removeFromCart(book.name); // Remove the book from the cart after confirming the order
      } else {
        alert('Failed to confirm the order. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('An error occurred while confirming the order.');
    }
  };

  return (
    <section id="cart" className="card">
      <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{book.name}</h3>
                <p className="text-sm text-gray-600">
                  Author: <span className="font-medium">{book.author}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: <span className="font-medium">{book.quantity}</span>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => removeFromCart(book.name)}
                >
                  Remove
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => confirmOrder(book)}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
              onClick={() => {
                const orderPlaced = document.getElementById('order-placed');
                orderPlaced.style.display = 'block';
                setTimeout(() => (orderPlaced.style.display = 'none'), 2000);
              }}
            >
              Place Order
            </button>
            <div
              id="order-placed"
              className="bg-green-100 border border-green-500 rounded p-4 mt-4 text-green-800 hidden"
            >
              <FaCheckCircle className="text-4xl" />
              <span className="ml-4">Order Placed!</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;
