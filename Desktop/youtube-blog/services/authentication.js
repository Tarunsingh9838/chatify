const JWT = require("jsonwebtoken");

const secret = "$uperMan@123"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL
    }
    return JWT.sign(payload,secret);
}

function validateToken(token){
    
    const payload = JWT.verify(token,secret);
    return payload;
}  

module.exports = {
    createTokenForUser,
    validateToken
}