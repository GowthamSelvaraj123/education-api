<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Education API - Documentation</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 40px auto;
      max-width: 900px;
      padding: 0 20px;
      line-height: 1.6;
      color: #333;
      background-color: #fafafa;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    code {
      background-color: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      background: #f4f4f4;
      padding: 10px;
      overflow-x: auto;
    }
    hr {
      border: 1px solid #ddd;
    }
  </style>
</head>
<body>

  <h1>🎓 Education API</h1>
  <p>A RESTful API for an online education platform built with <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>.</p>

  <hr>

  <h2>📦 Features</h2>
  <ul>
    <li>User Authentication (JWT)</li>
    <li>Role-based Access (Admin, Instructor, Student)</li>
    <li>Courses, Lessons, Categories, Reviews</li>
    <li>Course Enrollment</li>
    <li>Profile & Password Management</li>
  </ul>

  <h2>🛠 Tech Stack</h2>
  <ul>
    <li><strong>Backend:</strong> Node.js, Express</li>
    <li><strong>Database:</strong> MongoDB, Mongoose</li>
    <li><strong>Authentication:</strong> JWT + Bcrypt</li>
  </ul>

  <h2>📁 Project Structure</h2>
  <pre><code>
/education-api
├── controllers/
├── models/
├── routes/
├── middlewares/
├── server.js
├── .env
</code></pre>

  <h2>⚙️ Getting Started</h2>
  <pre><code>git clone https://github.com/your-username/education-api
cd education-api
npm install

# Create a .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/education-api
JWT_SECRET=your_jwt_secret

npm run dev
</code></pre>

  <h2>📬 API Endpoints</h2>
  <h3>Auth</h3>
  <ul>
    <li><code>POST /api/register</code> - Register</li>
    <li><code>POST /api/login</code> - Login</li>
  </ul>

  <h3>Courses</h3>
  <ul>
    <li><code>GET /api/courses</code> - List all courses</li>
    <li><code>GET /api/courses/:id</code> - Get course details</li>
    <li><code>POST /api/courses/:id/enroll</code> - Enroll in course</li>
  </ul>

  <h3>Lessons</h3>
  <ul>
    <li><code>GET /api/courses/:id/lessons</code> - List lessons</li>
    <li><code>GET /api/lessons/:id</code> - Lesson details</li>
  </ul>

  <h3>Admin (optional)</h3>
  <ul>
    <li><code>POST /api/admin/category</code> - Create category</li>
    <li><code>POST /api/admin/course</code> - Create course</li>
  </ul>

  <h2>📜 License</h2>
  <p>MIT</p>

  <h2>👨‍💻 Author</h2>
  <p>Gowtham — <a href="https://github.com/gowthamdeveloper" target="_blank">GitHub Profile</a></p>

</body>
</html>
