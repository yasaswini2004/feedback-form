import admin from "firebase-admin";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(path.resolve("firebase-config.json"))),
    databaseURL: "https://feedback-form-34b40-default-rtdb.firebaseio.com",
  });
}

export async function handler(event) {
  console.log("Function triggered");

  if (event.httpMethod !== "POST") {
    console.log("Invalid method:", event.httpMethod);
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const feedback = JSON.parse(event.body);
    console.log("Received feedback:", feedback);

    const feedbackRef = admin.database().ref("feedbacks");
    await feedbackRef.push({
      fullName: feedback.fullName,
      email: feedback.email,
      message: feedback.message,
      timestamp: new Date().toISOString(),
    });

    console.log("Feedback stored successfully");
    return { statusCode: 200, body: JSON.stringify({ message: "Feedback stored successfully!" }) };
  } catch (err) {
    console.error("Error storing feedback:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not store feedback" }) };
  }
}
