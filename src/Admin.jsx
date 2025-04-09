import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import app from '../firebase';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const feedbackRef = ref(db, 'feedbacks');

    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      const loadedFeedbacks = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setFeedbacks(loadedFeedbacks);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedFeedbackId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const db = getDatabase(app);
    remove(ref(db, `feedbacks/${selectedFeedbackId}`));
    setIsModalOpen(false);
    setSelectedFeedbackId(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedFeedbackId(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feedback Admin Panel</h1>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map(({ id, name, email, message }) => (
            <li
              key={id}
              className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-start"
            >
              <div>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Message:</strong> {message}</p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => handleDeleteClick(id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Admin;
