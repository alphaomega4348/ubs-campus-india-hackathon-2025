import React, { useState } from 'react';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState('');
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

  const [ocrResult, setOcrResult] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [formError, setFormError] = useState('');

  const generateCertificate = async ({ donorName, bookTitle, quantity, date }) => {
    try {
      const response = await fetch('http://localhost:8002/api/certificate/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donorName, bookTitle, quantity, date })
      });

      if (!response.ok) throw new Error('Failed to generate certificate');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${donorName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Certificate generation failed:', error);
      alert('Error generating certificate');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!donorName.trim()) {
      setFormError('Donor name is required.');
      return;
    }

    if (!newDonation.category) {
      setFormError('Category must be extracted from the image.');
      return;
    }

    const newId = donations.length > 0 ? Math.max(...donations.map((d) => d.donation_id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const donationToAdd = {
      ...newDonation,
      donation_id: newId,
      status: 'pending',
      date: today
    };

    setDonations([...donations, donationToAdd]);

    // Generate certificate
    generateCertificate({
      donorName,
      bookTitle: newDonation.title,
      quantity: newDonation.quantity,
      date: today
    });

    // Reset form
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
    setFormError('');
    setDonorName('');
    alert('Donation added successfully!');
  };

  const fetchBookDataFromImage = async (file) => {
    setIsExtracting(true);
    setOcrResult(null);
    setFormError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:8000/api/ocr/process', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Failed to process image');

      const data = await response.json();
      setOcrResult(data);

      if (data.newBook) {
        setNewDonation((prev) => ({
          ...prev,
          title: data.newBook.title || prev.title,
          author: data.newBook.author || prev.author,
          category: data.newBook.category || prev.category
        }));
      }
    } catch (error) {
      console.error('OCR error:', error);
      setOcrResult({ error: 'Failed to extract book info.' });
      setFormError('Failed to extract book info from image.');
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Donor Dashboard</h1>
        <p className="text-lg text-gray-500">Thank you for your generosity! Your donations make a difference.</p>
      </header>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-b-2 border-blue-500 inline-block">
          Donate Books
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Donor Name */}
          <div className="flex flex-col">
            <label htmlFor="donorName" className="font-semibold text-sm text-gray-700 mb-1">Donor Name</label>
            <input
              type="text"
              id="donorName"
              placeholder="Your full name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Title and Author */}
          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="title" className="font-semibold text-sm text-gray-700 mb-1">Book Title</label>
              <input
                type="text"
                id="title"
                value={newDonation.title}
                onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="author" className="font-semibold text-sm text-gray-700 mb-1">Author</label>
              <input
                type="text"
                id="author"
                value={newDonation.author}
                onChange={(e) => setNewDonation({ ...newDonation, author: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Condition and Quantity */}
          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="condition" className="font-semibold text-sm text-gray-700 mb-1">Condition</label>
              <select
                id="condition"
                value={newDonation.condition}
                onChange={(e) => setNewDonation({ ...newDonation, condition: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select condition</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="quantity" className="font-semibold text-sm text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={newDonation.quantity}
                onChange={(e) => setNewDonation({ ...newDonation, quantity: parseInt(e.target.value) })}
                required
                className="p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Grade Level and Auto-detected Category */}
          <div className="flex flex-col md:flex-row gap-5 mb-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="gradeLevel" className="font-semibold text-sm text-gray-700 mb-1">Grade Level</label>
              <select
                id="gradeLevel"
                value={newDonation.gradeLevel}
                onChange={(e) => setNewDonation({ ...newDonation, gradeLevel: e.target.value })}
                required
                className="p-3 border border-gray-300 rounded-md"
              >
                <option value="">Select grade level</option>
                <option value="none">None</option>
                <option value="Pre-K">Pre-K</option>
                <option value="Elementary">Elementary</option>
                <option value="Middle School">Middle School</option>
                <option value="High School">High School</option>
                <option value="College">College</option>
              </select>
            </div>

            <div className="flex flex-col flex-1">
              <label className="font-semibold text-sm text-gray-700 mb-1">Category (auto-detected)</label>
              <input
                type="text"
                value={newDonation.category}
                readOnly
                placeholder="Detected from image"
                className="p-3 border border-gray-300 bg-gray-100 rounded-md"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mt-2 mb-6">
            <label className="font-semibold text-sm text-gray-700 mb-2 block">Upload Book Cover Image</label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${newDonation.image ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} text-center cursor-pointer`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                handleImageUpload(file);
              }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              {isExtracting ? (
                <p className="text-blue-600 font-medium">Extracting book info...</p>
              ) : newDonation.image ? (
                <>
                  <img
                    src={typeof newDonation.image === 'string' ? newDonation.image : URL.createObjectURL(newDonation.image)}
                    alt="Book"
                    className="max-h-40 mx-auto mb-4 rounded"
                  />
                  <p className="text-sm text-gray-600">Click or drag to change image</p>
                </>
              ) : (
                <p className="text-sm text-gray-600">Click or drag to upload image</p>
              )}
            </div>
            <input
              type="file"
              id="image-upload"
              hidden
              onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
            />
          </div>

          
          {ocrResult && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-800 whitespace-pre-wrap">
              <h3 className="text-md font-semibold mb-2">OCR Result:</h3>
              <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
            </div>
          )}

          {formError && <p className="text-red-500 text-sm font-medium">{formError}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-md font-semibold text-base transition-colors duration-200 self-start"
          >
            Donate Books & Get Certificate
          </button>
        </form>
      </section>
    </div>
  );
};

export default DonorDashboard;