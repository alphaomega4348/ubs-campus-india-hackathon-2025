import React from 'react';
import { useNavigate } from 'react-router-dom';

function Body() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      <div className="px-10">
        <div className="flex max-h-full md:w-full px-5 py-20">
          <div>
            <div className="flex flex-col-full items-center">
              <div className="card bg-base-100 image-full shadow-sm">
                <figure>
                  <img
                    src="https://bookscouter.com/blog/wp-content/uploads/2024/01/Donations-1.jpg"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body text-center">
                  <h2 className="justify-center text-4xl font-bold mt-6 mb-2 card-title">
                    From Your Shelf To Someone's Hands
                  </h2>
                  <div className="text-xl mt-30 mb-50">
                    <p>
                      Transform lives through the power of reading. Your donated books can open doors to education,
                    </p>
                    <p>imagination, and opportunity for those who need it most.</p>
                  </div>
                  <div className="card-actions justify-center">
                    <button
                      onClick={() => navigate('/signup')} // Navigate to signup route
                      className="bg-orange-500 hover:bg-orange-700 text-white btn btn-center"
                    >
                      Donate Your Books <span className="text-2xl text-white">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card bg-base-100 w-96 shadow-sm"></div>
              <div>
                <h1 className="mt-10 font-bold text-3xl">Our Mission</h1>
                <p>
                  We believe that every book deserves a second life and every person deserves access to knowledge.
                  Through our donation program, we connect generous donors with readers in need, creating a cycle of
                  learning and opportunity that strengthens communities.
                </p>
              </div>

              <div className="px-5 py-20">
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="card bg-base-100 w-80 shadow-sm">
                    <figure>
                      <img
                        src="https://th.bing.com/th/id/OIP.BLjsEpVg-WULLxNWPEXVygAAAA?rs=1&pid=ImgDetMain"
                        alt="Collections"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body text-center">
                      <h2 className="text-center card-title">Collections</h2>
                      <p>
                        We gather new and pre-owned books from people, schools, businesses, and others who want to
                        contribute to the cause.
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-100 w-80 shadow-sm">
                    <figure>
                      <img
                        src="https://s3.scoopwhoop.com/anj/599049483.jpg"
                        alt="User's Need"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body text-center">
                      <h2 className="card-title">User's Need</h2>
                      <p>
                        We carefully review the user's needs for old books to ensure they receive the most suitable
                        collection.
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-100 w-80 shadow-sm">
                    <figure>
                      <img
                        src="https://www.newagebd.com/files/records/news/202101/125949_137.jpg"
                        alt="Distribution"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body text-center">
                      <h2 className="card-title">Distribution</h2>
                      <p>
                        Our partners ensure smooth and timely distribution of books, bringing them to those in need.
                      </p>
                    </div>
                  </div>

                  <div className="card bg-base-100 w-80 shadow-sm">
                    <figure>
                      <img
                        src="https://mediamodifier.com/blog/wp-content/uploads/2021/08/65b56804773a3377f31631684aa22e16_mm-showroom-image.jpg"
                        alt="Verification"
                        className="rounded-xl"
                      />
                    </figure>
                    <div className="card-body text-center">
                      <h2 className="card-title">Verification</h2>
                      <p>We verify the books reach the right people, ensuring a meaningful impact.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card bg-base-100 image-full shadow-sm"></div>
              </div>
            </div>

            <div>
              <h1 className="text-center text-4xl font-bold mt-6 mb-2">How It Works</h1>
              <h1 className="text-center text-xl mb-10">Simple Steps to make an impact</h1>
            </div>
            <div className="flex justify-center gap-10 mb-6">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-book-open text-orange-500"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <p className="text-2xl font-bold mb-4">Donate Books</p>
                <h1>Register and list your books for donation through our simple process.</h1>
              </div>

              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users text-blue-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <p className="text-2xl font-bold mb-4">Connect</p>
                <h1>We match your books with readers and organisations in need.</h1>
              </div>

              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart text-red-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <p className="text-2xl font-bold mb-4">Make an Impact</p>
                <h1>Your books find new homes and help spread knowledge and joy.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
