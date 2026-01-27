const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/user.route');
const messageRoute = require('./routes/message.route');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();
const {app, server, io} =require ('./SocketIo/server.js')




app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true,
  })
);

const port = process.env.PORT || 3000;
const URI= process.env.mongodb_URI;

try {
  mongoose.connect(URI);
  console.log('Connected to MongoDB')
  
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

app.use("/users", userRoute);
app.use("/message", messageRoute);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});