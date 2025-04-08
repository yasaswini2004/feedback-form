import React, { useEffect, useState } from "react";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/api/get-feedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Submitted Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No feedback yet.</p>
      ) : (
        feedbacks.map((fb, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md rounded p-4 mb-4 transition-transform transform hover:scale-[1.01] duration-300"
          >
            <p><strong>Name:</strong> {fb.fullName}</p>
            <p><strong>Email:</strong> {fb.email}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Submitted on: {new Date(fb.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
