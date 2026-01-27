# 💬 Chatify - Real-time Chat Application

A modern, real-time chat application built with React and Node.js, featuring a Telegram-inspired dark theme design.

![Chat App](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen) ![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-yellow)

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT
- 💬 **Real-time Messaging** - Instant message delivery via Socket.IO
- 🟢 **Online Status** - See who's online in real-time
- 🔍 **User Search** - Filter users by name or email
- 🗑️ **Message Delete** - Delete your sent messages
- 📱 **Mobile Responsive** - Works on all screen sizes
- 🎨 **Telegram Dark Theme** - Beautiful dark UI inspired by Telegram

## 🛠️ Tech Stack

### Frontend
- React 18
- Zustand (State Management)
- Tailwind CSS + DaisyUI
- Socket.IO Client
- Axios
- React Router DOM

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Tarunsingh9838/chatify.git
cd chatify
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `PORT` | Server port (default: 3000) |

## 📱 Screenshots

### Desktop View
- Left sidebar with user list and search
- Right panel with chat messages
- Real-time online status indicators

### Mobile View
- Full-screen user list
- Tap to open chat
- Back button to return to list

## 🚀 API Endpoints

### Authentication
- `POST /users/signup` - Register new user
- `POST /users/login` - User login
- `POST /users/logout` - User logout

### Messages
- `GET /message/get/:id` - Get messages with user
- `POST /message/send/:id` - Send message to user
- `DELETE /message/delete/:id` - Delete a message

### Users
- `GET /users/allUsers` - Get all users

## 📁 Project Structure

```
LC-Chat-App/
├── Backend/
│   ├── controller/      # Route handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── SocketIo/        # Socket.IO setup
│   └── index.js         # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Auth components
    │   ├── context/     # React contexts & hooks
    │   ├── home/        # Main app components
    │   ├── zustand/     # State management
    │   └── App.jsx      # Main app
    └── index.html
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Tarun Singh**
- GitHub: [@Tarunsingh9838](https://github.com/Tarunsingh9838)

---

⭐ Star this repo if you find it helpful!
