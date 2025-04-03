import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([
    {
      donation_id: 1,
      title: "Harry Potter and the Philosopher's Stone",
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
      title: "Charlotte's Web",
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
    author: '',
    condition: '',
    quantity: 1,
    gradeLevel: '',
    language: 'English',
    category: '',
    location: '',
    image: ''
  });

  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

<<<<<<< Updated upstream
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/donar/donors/get-all');
        // const responseData = await response.json();
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

=======
>>>>>>> Stashed changes
  const handleSubmit = (e) => {
    e.preventDefault();

    const newId =
      donations.length > 0
        ? Math.max(...donations.map((d) => d.donation_id)) + 1
        : 1;
    const today = new Date().toISOString().split('T')[0];

    const donationToAdd = {
      ...newDonation,
      donation_id: newId,
      status: 'pending',
      date: today
    };

    setDonations([...donations, donationToAdd]);

    setNewDonation({
      title: '',
      author: '',
      condition: '',
      quantity: 1,
      gradeLevel: '',
      language: 'English',
      category: '',
      location: '',
      image: ''
    });

    setOcrResult(null);
    alert('Donation added successfully!');
  };

  const fetchBookDataFromImage = async (file) => {
    setIsExtracting(true);
    setOcrResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:8000/api/ocr/process', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setOcrResult(data);

      if (data.newBook) {
        setNewDonation((prev) => ({
          ...prev,
          title: data.newBook.title || prev.title,
          author: data.newBook.author || prev.author
        }));
      }
    } catch (error) {
      console.error('OCR error:', error);
      setOcrResult({ error: 'Failed to extract book info.' });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImageUpload = async (file) => {
    setNewDonation({ ...newDonation, image: file });
    fetchBookDataFromImage(file);
  };

  return (
    <div className="max-w-7xl mx-auto p-5 font-sans text-gray-800">
      <header className="text-center mb-8 pb-5">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Donor Dashboard
        </h1>
        <p className="text-lg text-gray-500">
          Thank you for your generosity! Your donations make a difference.
        </p>
      </header>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-blue-500 inline-block">
          Donate Books
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="title" className="font-semibold text-sm text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={newDonation.title}
                onChange={(e) =>
                  setNewDonation({ ...newDonation, title: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="author" className="font-semibold text-sm text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                id="author"
                placeholder="Author"
                value={newDonation.author}
                onChange={(e) =>
                  setNewDonation({ ...newDonation, author: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="condition" className="font-semibold text-sm text-gray-700 mb-1">
                Condition
              </label>
              <select
                id="condition"
                value={newDonation.condition}
                onChange={(e) =>
                  setNewDonation({ ...newDonation, condition: e.target.value })
                }
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
                onChange={(e) =>
                  setNewDonation({
                    ...newDonation,
                    quantity: parseInt(e.target.value)
                  })
                }
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
                onChange={(e) =>
                  setNewDonation({
                    ...newDonation,
                    gradeLevel: e.target.value
                  })
                }
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
                onChange={(e) =>
                  setNewDonation({ ...newDonation, category: e.target.value })
                }
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

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="mt-2 mb-6">
            <label className="font-semibold text-sm text-gray-700 mb-2 block">
              Upload Book Cover Image
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${
                newDonation.image
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              } transition-colors duration-200 text-center cursor-pointer`}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const file = e.dataTransfer.files[0];
                  handleImageUpload(file);
                }
              }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              {isProcessingImage ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
                  <p className="text-blue-600 font-medium">Extracting book information...</p>
                </div>
              ) : newDonation.image ? (
                <div className="flex flex-col items-center">
                  <img
                    src={
                      typeof newDonation.image === 'string'
                        ? newDonation.image
                        : URL.createObjectURL(newDonation.image)
                    }
                    alt="Book preview"
                    className="max-h-40 mb-4 rounded"
                  />
                  <p className="text-sm text-gray-600">
                    Click or drag to change image
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-600">
                    Click or drag to upload image
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(e.target.files[0]);
                }
              }}
            />
          </div>

          {isExtracting && (
            <div className="text-blue-500 text-sm mt-2">Processing image...</div>
          )}
          {ocrResult && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap">
              <h3 className="text-md font-semibold mb-2">OCR Result:</h3>
              <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-md font-semibold text-base transition-colors duration-200 self-start"
          >
            Donate Books
          </button>
        </form>
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

