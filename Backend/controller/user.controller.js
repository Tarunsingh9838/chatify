const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { createTokenandSaveCookie } = require("../jwt/generateToken");

// Create a new user
const signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      createTokenandSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
    // createTokenandSaveCookie(newUser._id, res);
    // res.status(201).json({
    //   message: "User created successfully",
    //   user: {
    //     _id: newUser._id,
    //     fullname: newUser.fullname,
    //     email: newUser.email,
    //   },
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 2️⃣ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // 3️⃣ generate token
    createTokenandSaveCookie(user._id, res);

    // 4️⃣ success response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const Conversation = require("../models/conversation.model");

    // Get all users except logged in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

    // Get last message info for each user
    const usersWithLastMessage = await Promise.all(
      filteredUsers.map(async (user) => {
        // Find conversation between logged in user and this user
        const conversation = await Conversation.findOne({
          members: { $all: [loggedInUser, user._id] },
        }).populate({
          path: "message",
          options: { sort: { createdAt: -1 }, limit: 1 },
        });

        let lastMessage = null;
        let lastMessageTime = null;

        if (conversation && conversation.message && conversation.message.length > 0) {
          const lastMsg = conversation.message[0];
          lastMessage = lastMsg.message;
          lastMessageTime = lastMsg.createdAt;
        }

        return {
          ...user.toObject(),
          lastMessage: lastMessage || "",
          lastMessageTime: lastMessageTime || null,
        };
      })
    );

    // Sort users by last message time (most recent first)
    usersWithLastMessage.sort((a, b) => {
      if (!a.lastMessageTime && !b.lastMessageTime) return 0;
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    res.status(200).json(usersWithLastMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  allUsers,
};
