import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full Name is required";
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "message":
        if (!value.trim()) error = "Feedback message is required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const response = await fetch("/.netlify/functions/submit-feedback", {
      method: "POST",
      body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (response.ok) {
      setSubmitted(true);
      setFormData({ fullName: "", email: "", message: "" });
      setErrors({});
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
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
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
        {errors.email && <p className="text-red-500">{errors.email}</p>}
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
        {errors.message && <p className="text-red-500">{errors.message}</p>}
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
