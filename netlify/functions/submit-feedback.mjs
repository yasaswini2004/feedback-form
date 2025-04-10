import admin from "firebase-admin";
import { readFileSync } from "fs";


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    databaseURL: "https://feedback-form-34b40-default-rtdb.firebaseio.com",
  });
}


export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: `Method ${event.httpMethod} Not Allowed` }) };
  }

  try {
    const feedback = JSON.parse(event.body);
    const feedbackRef = admin.database().ref("feedbacks");

    await feedbackRef.push({
      fullName: feedback.fullName,
      email: feedback.email,
      message: feedback.message,
      timestamp: new Date().toISOString(),
    });

    return { statusCode: 200, body: JSON.stringify({ message: "Feedback stored successfully!" }) };
  } catch (err) {
    console.error("Error storing feedback:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Could not store feedback" }) };
  }
}
