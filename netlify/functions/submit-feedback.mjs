import admin from "firebase-admin";
import { readFileSync } from "fs";

if (!admin.apps.length) {
  const firebaseConfig = JSON.parse(readFileSync("./firebase-config.json", "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://feedback-form-34b40-default-rtdb.firebaseio.com",
  });
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
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
    return { statusCode: 500, body: JSON.stringify({ error: "Could not store feedback" }) };
  }
}
