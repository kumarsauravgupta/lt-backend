# Lantern Backend

Backend API for the Lantern platform.

Lantern connects:

- Students
- Colleges
- Industry/recruiters

The API supports authentication, student profiles, opportunities, applications, college dashboards and transparent skill-based candidate matching.

## Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing

## 1. Install Node.js

Install Node.js LTS.

Check:

```bash
node -v
npm -v
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure MongoDB

Copy:

```text
.env.example
```

to:

```text
.env
```

For local MongoDB:

```env
MONGO_URI=mongodb://127.0.0.1:27017/lantern
JWT_SECRET=use-a-long-random-secret
PORT=5000
CLIENT_URL=http://127.0.0.1:5500
```

You can also use a MongoDB Atlas connection string instead.

## 4. Seed demo data

```bash
node seed.js
```

Demo accounts:

```text
Student:
saurav@lantern.dev
Password:
Lantern@123

College:
college@lantern.dev
Password:
Lantern@123

Industry:
industry@lantern.dev
Password:
Lantern@123
```

## 5. Start server

Development:

```bash
npm run dev
```

Normal:

```bash
npm start
```

API:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

## API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Students

```text
GET  /api/students/profile
POST /api/students/profile
GET  /api/students/directory
```

Example:

```text
GET /api/students/directory?skill=Python
```

### Opportunities

```text
GET  /api/opportunities
POST /api/opportunities
POST /api/opportunities/:id/apply
GET  /api/opportunities/my-applications
```

Examples:

```text
GET /api/opportunities?type=internship
GET /api/opportunities?skill=React
```

### Hiring

```text
GET  /api/hiring/jobs
POST /api/hiring/jobs
GET  /api/hiring/candidates?skills=Python,ML,SQL
```

The candidate endpoint calculates a transparent baseline match:

```text
matched required skills / total required skills × 100
```

It is intentionally not presented as an AI decision. A future ML service can replace this scoring layer.

### College

```text
GET /api/colleges/dashboard
```

## Frontend connection

Your current Lantern frontend currently creates demo data in JavaScript. Replace those hard-coded arrays with `fetch()` calls to this API.

Example:

```javascript
const API = "http://localhost:5000/api";

async function loadInternships() {
  const response = await fetch(`${API}/opportunities?type=internship`);
  const data = await response.json();

  console.log(data.opportunities);
}
```

For authenticated requests:

```javascript
const token = localStorage.getItem("token");

const response = await fetch(`${API}/students/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data = await response.json();
```

## Recommended next architecture

```text
Lantern
│
├── Frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── Backend
│   ├── server.js
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── seed.js
│
└── Database
    └── MongoDB
```

Later add:

- GitHub API integration
- LeetCode/statistics integration where permitted
- resume upload and parsing
- skill-gap analysis
- recommendation engine
- notifications
- recruiter applications dashboard
- college analytics
- admin moderation
- email verification
- password reset
- rate limiting
- audit logs
- production deployment
