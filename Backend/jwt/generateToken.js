const jwt = require('jsonwebtoken');


const createTokenandSaveCookie = (userId,res) => {
    const token  = jwt.sign({userId }, 
        process.env.JWT_TOKEN, {
        expiresIn: '10d',
    });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    };

    res.cookie("jwt", token, cookieOptions);

}
module.exports = {
    createTokenandSaveCookie,
};  