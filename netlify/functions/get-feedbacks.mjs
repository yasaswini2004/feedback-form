import admin from "firebase-admin";
import { readFileSync } from "fs";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    databaseURL: "https://feedback-form-34b40-default-rtdb.firebaseio.com",
  });
}

export async function handler() {
  console.log("Fetching feedbacks...");

  const feedbackRef = admin.database().ref("feedbacks");

  try {
    const snapshot = await feedbackRef.once("value");
    const feedbacksObject = snapshot.val() || {};

    // Convert object to array
    const feedbacksArray = Object.values(feedbacksObject);

    console.log("Fetched feedback:", feedbacksArray);
    return { statusCode: 200, body: JSON.stringify(feedbacksArray) };
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Could not fetch feedbacks" }) };
  }
}

