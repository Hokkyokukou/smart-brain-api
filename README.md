### SmartBrain API - Back-End Server 🌐⚙️
![GitHub stars](https://img.shields.io/github/stars/Hokkyokukou/smart-brain-api?style=social)
![GitHub forks](https://img.shields.io/github/forks/Hokkyokukou/smart-brain-api?style=social)

> **Personal Description:**  
> _SmartBrain API serves as the back-end component for the [SmartBrain Face Detection App](https://github.com/Hokkyokukou/smartbrain). Built using Node.js and Express.js, this server provides a robust architecture to handle API requests and manage user interactions with the database._

---

### Key Features 🌟

- **API Endpoints**: The server exposes several API endpoints for user authentication, image processing, and data retrieval.
- **PostgreSQL Database Integration**: The app interfaces with a PostgreSQL database to store user data and application state efficiently.
- **Authentication**: User authentication is managed securely, allowing users to sign in and track their activity.

### Project Objectives 🏆
SmartBrain API is designed to demonstrate:
- _Effective use of Node.js and Express.js for server-side development._
- _Integration of PostgreSQL for data management._
- _Implementation of RESTful API principles._

### Setup & Run 💻

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Hokkyokukou/smart-brain-api.git
   cd smart-brain-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root folder with the following variables:
   ```plaintext
   CLARIFAI_API_KEY=your_key
   APP_ID=face-recognition-brain
   DATABASE_DB=your_database_db
   DATABASE_HOST=your_database_host
   DATABASE_PW=your_database_pw
   DATABASE_URL=your_database_url
   DATABASE_USER=your_database_user
   USER_ID=your_user_id
   ```
> **Note**: You can obtain the `CLARIFAI_API_KEY` by creating an account at [Clarifai](https://clarifai.com/).

4. **Start the server:**
   ```bash
   node server.js
   ```

---

> **Note**: The SmartBrain API works in conjunction with the front end application. To see how the two components interact, please visit the [SmartBrain Front End Repository](https://github.com/Hokkyokukou/smartbrain).
