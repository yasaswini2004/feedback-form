exports.handler = async () => {
  const feedbackRef = admin.database().ref("feedbacks");

  try {
    const snapshot = await feedbackRef.once("value");
    return { statusCode: 200, body: JSON.stringify(snapshot.val() || []) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Could not fetch feedbacks" }) };
  }
};
