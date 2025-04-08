const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require(path.join(__dirname, "../../firebase-config.json"))
    ),
    databaseURL: "https://feedback-form-34b40-default-rtdb.firebaseio.com",
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const feedback = JSON.parse(event.body);
  const feedbackRef = admin.database().ref("feedbacks");

  try {
    await feedbackRef.push({
      fullName: feedback.fullName,
      email: feedback.email,
      message: feedback.message,
      timestamp: new Date().toISOString(),
    });

    return { statusCode: 200, body: JSON.stringify({ message: "Feedback stored successfully!" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Could not store feedback" }) };
  }
};
