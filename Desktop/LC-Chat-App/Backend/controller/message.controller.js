const Message = require("../models/message.models");
const Conversation = require("../models/conversation.model");

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id; // 👈 from JWT

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // 1️⃣ Find or create conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
      });
      await conversation.save();
    }

    // 2️⃣ Create message (FIELD NAMES FIXED 👇)
    const newMessage = new Message({
      sender: senderId,     // ✅ correct
      receiver: receiverId, // ✅ correct
      message,
    });

    // 3️⃣ Push message to conversation
    conversation.message.push(newMessage._id); // ✅ plural

    // 4️⃣ Save both
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.log("error in send message", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: chatUser} = req.params;
    const senderId = req.user._id; // from JWT
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("message");
    if (!conversation) {
      return res.status(200).json({ messages: [] });
    }
    const messages = conversation.message;
    res.status(200).json({ messages });


  }catch (error) {
    console.log("error in get message", error);
    res.status(500).json({ message: "Internal server error" });
  }

    
}


module.exports = { sendMessage ,getMessage};
