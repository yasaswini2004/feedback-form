import React, { useEffect, useState } from "react";

const FEEDBACKS_PER_PAGE = 10;

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/.netlify/functions/get-feedbacks")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setFeedbacks(Array.isArray(data) ? data.reverse() : []);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setCurrentPage(1);
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const lowerTerm = searchTerm.toLowerCase();
    const matchesSearch =
      fb.fullName?.toLowerCase().includes(lowerTerm) ||
      fb.email?.toLowerCase().includes(lowerTerm) ||
      fb.message?.toLowerCase().includes(lowerTerm);

    const submittedDate = new Date(fb.timestamp).toISOString().split("T")[0];

    const withinDateRange =
      (!startDate || submittedDate >= startDate) &&
      (!endDate || submittedDate <= endDate);

    return matchesSearch && withinDateRange;
  });

  const totalPages = Math.ceil(filteredFeedbacks.length / FEEDBACKS_PER_PAGE);
  const startIndex = (currentPage - 1) * FEEDBACKS_PER_PAGE;
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + FEEDBACKS_PER_PAGE);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Submitted Feedbacks</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, email, or message..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-600"
      />

      {/* 📅 Date Filters */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-1/2 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-1/2 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading feedback...</p>
      ) : filteredFeedbacks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No feedback found.</p>
      ) : (
        <>
          {currentFeedbacks.map((fb, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mb-4"
            >
              <p><strong>Name:</strong> {fb.fullName}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Message:</strong> {fb.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                Submitted on: {new Date(fb.timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
