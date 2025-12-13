const { createHmac, randomBytes } = require('crypto');
const mongoose = require('mongoose');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: "/images/image.png",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],   // FIXED
    default: "USER",           // FIXED
  },
  
}, { timestamps: true });

userSchema.pre("save", function (next) {
  const user = this;

  // If password is not modified, skip hashing
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
  const user = await this.findOne({email});
  if(!user)  throw new Error("User not found");

  const salt = user.salt;
  const hashedPassword = user.password

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

   if (userProvidedHash !== user.password) {
    throw new Error("Incorrect password");
  }
  const token = createTokenForUser(user);
  return token;
})
 

const User = mongoose.model("User", userSchema);
module.exports = User;
