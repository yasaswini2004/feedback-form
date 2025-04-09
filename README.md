# **Feedback Collector**

## **Live Demo**
Access the live project here: [FormFeed Feedback Collector](https://formfeed.netlify.app/)

## **GitHub Repository**
View the source code here: [Feedback Collector GitHub Repository](https://github.com/yasaswini2004/feedback-form)


## **Overview**
This project is a single-page application designed to collect feedback from users and display the submitted entries in an admin view. It features frontend and backend functionality using React, Netlify Functions, and Firebase.


## **Features**
- **Frontend**:
  - Form includes fields for Full Name, Email, and Feedback message.
  - Basic email validation.
  - Submit button with loading state.
  - Admin view to display submitted feedbacks in a paginated list or cards.
  - Search functionality to filter feedback by name, email, or message.
  - Date range filters to view feedback submitted within specific periods.
  - Pagination for easier navigation through feedbacks.
  - Dark/Light mode toggle stored in local storage.

- **Backend**:
  - Serverless API with Netlify Functions and Firebase integration.
  - **POST `/submit-feedback`**: Accepts feedback and stores it in Firebase.
  - **GET `/get-feedbacks`**: Retrieves all feedback entries from Firebase.


## **Tech Stack**
- **Frontend**:
  - React (Vite)
  - Tailwind CSS
- **Backend**:
  - Netlify Functions
  - Firebase Realtime Database
- **Hosting**:
  - Netlify
- **Version Control**:
  - GitHub


## **Setup Instructions**

### **Clone the Repository**
```bash
git clone https://github.com/yasaswini2004/feedback-form.git
cd feedback-form
```


### **Install Dependencies**
Run the following command to install all required dependencies:

```bash
npm install
```

### **Firebase Configuration**
1. Obtain your Firebase credentials file (`firebase-config.json`) from the Firebase Console.
2. Save the file in the project root directory.
3. Ensure it is listed in `.gitignore` to prevent exposing sensitive information.

### **Set Up Netlify Environment Variables**
1. Navigate to your Netlify project dashboard.
2. Go to **Site Settings → Environment Variables**.
3. Add the following variables:

| Variable Name      | Description                                         |
|--------------------|-----------------------------------------------------|
| `FIREBASE_CONFIG`  | Paste the entire content of `firebase-config.json` |
| `FIREBASE_DB_URL`  | Your Firebase Realtime Database URL                |

### **Run Locally**
To run the project locally using Netlify CLI:

```bash
$env:FIREBASE_CONFIG = Get-Content firebase-config.json
netlify dev
```
## **Test Backend Endpoints**

#### POST `/submit-feedback`
Test with Postman or `curl`:

```bash
curl -X POST "http://localhost:8888/.netlify/functions/submit-feedback" \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test User","email":"test@example.com","message":"Hello!"}'
```
#### GET /get-feedbacks:
Test with Postman or `curl`:

```bash
curl "http://localhost:8888/.netlify/functions/get-feedbacks"
```


## **Deploy to Netlify**
### **1. Push your changes to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### **2. Go to Netlify and:**
Link your GitHub repository.
Set environment variables as mentioned earlier.
Click Deploy Site.

## **Folder Structure**
```bash
├── netlify/
│   └── functions/
│       ├── get-feedbacks.mjs
│       └── submit-feedback.mjs
├── src/
│   ├── Admin.jsx
│   ├── FeedbackForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── firebase-config.json
├── tailwind.config.js
├── netlify.toml
├── package.json
```

## **Credits**
Developer: Yasaswini

Submission Info: Fallon Studio Internship Assignment

