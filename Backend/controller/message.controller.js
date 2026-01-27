const Message = require("../models/message.models");
const Conversation = require("../models/conversation.model");
const { getRecieverSocketId, io } = require("../SocketIo/server");

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

    const revieverSocketId = getRecieverSocketId(receiverId);
    if (revieverSocketId) {
      io.to(revieverSocketId).emit("newMessage", newMessage);
    }

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
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // from JWT
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("message");
    if (!conversation) {
      return res.status(200).json({ messages: [] });
    }
    const messages = conversation.message;
    res.status(200).json({ messages });


  } catch (error) {
    console.log("error in get message", error);
    res.status(500).json({ message: "Internal server error" });
  }


}


// Delete a single message
const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    // Find the message
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete the message
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only delete your own messages" });
    }

    // Remove message from conversation
    await Conversation.updateOne(
      { message: messageId },
      { $pull: { message: messageId } }
    );

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    // Notify the receiver via socket
    const receiverSocketId = getRecieverSocketId(message.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", { messageId });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log("error in delete message", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { sendMessage, getMessage, deleteMessage };
