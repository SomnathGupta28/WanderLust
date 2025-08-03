# 🌍 Wanderlust - Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb. It enables users to explore, list, and book vacation rentals worldwide. This project is built using the **MERN-style stack** (MongoDB, Express, Node.js) with server-side rendering via **EJS templates**.

## 🛠 Tech Stack

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - EJS (Embedded JavaScript Templates)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ODM)

## ✨ Features

- User authentication (register/login/logout)
- Create, read, update, and delete property listings
- Upload property images
- Search and filter listings
- View detailed listing pages
- Add reviews and ratings
- Responsive UI for mobile and desktop
- Flash messages for user feedback

## 🚀 Installation & Setup

To run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add the following environment variables:

   ```env
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

5. **Access the application** at `http://localhost:3000`

## 📁 Project Structure

```
wanderlust/
│
├── public/               # Static files (CSS, JS, images)
├── views/                # EJS templates
├── models/               # Mongoose models
├── routes/               # Express routes
├── middleware/           # Custom middleware
├── utils/                # Utility functions
├── script.js             # Main app setup
└── package.json
```

## You can check it here
🔗 Project URL: https://wanderlust-kwp6.onrender.com


## 🧑‍💻 Author

**Somnath Gupta**
GitHub: [https://github.com/SomnathGupta28](https://github.com/SomnathGupta28)



