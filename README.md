````markdown
# 🌍 Wanderlust

Wanderlust is a full-stack Airbnb clone that allows users to explore, list, and book vacation rentals around the world. Built using Node.js, Express, MongoDB, and EJS, it delivers a seamless and responsive user experience.

---

## ✨ Features

- User authentication (register/login/logout)
- Create, read, update, and delete property listings
- Upload property images
- Search and filter listings
- View detailed listing pages
- Add reviews and ratings
- Responsive UI for mobile and desktop
- Flash messages for user feedback

---

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_token
   ```

4. **Run the application:**

   ```bash
   npm start
   ```

   The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
wanderlust/
│
├── public/               # Static files (CSS, JS, images)
├── views/                # EJS templates
├── models/               # Mongoose models
├── routes/               # Express routes
├── middleware/           # Custom middleware
├── utils/                # Utility functions
├── app.js                # Main app setup
└── package.json
```

---

## 🌐 Try It Out

🔗 **Project URL:** [https://wanderlust-kwp6.onrender.com](https://wanderlust-kwp6.onrender.com)

---

## 🧑‍💻 Author

**Somnath Gupta**

* GitHub: [@SomnathGupta28](https://github.com/SomnathGupta28)

