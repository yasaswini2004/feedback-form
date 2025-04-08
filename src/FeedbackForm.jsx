import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/submit-feedback", {
      method: "POST",
      body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);

    if (response.ok) {
      setSubmitted(true);
      setFormData({ fullName: "", email: "", message: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow transition-all duration-500"
    >
      <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>

      {submitted && (
        <p className="mb-4 text-green-600 dark:text-green-400">
          Thank you for your feedback!
        </p>
      )}

      <label className="block mb-4">
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="e.g., Yasaswini Sharma"
          className="mt-1 w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
        />
      </label>

      <label className="block mb-4">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="e.g., example@gmail.com"
          className="mt-1 w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
        />
      </label>

      <label className="block mb-4">
        Feedback:
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Write your thoughts here..."
          className="mt-1 w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
