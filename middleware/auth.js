const jwt = require('jsonwebtoken');
 
const authCheck = async(req, res, next) => {
    const authToken = req.headers.authorization;
    
    if(!authToken || !authToken.startsWith('Bearer ') || authToken.split(" ").length !== 2) {
        return res.status(401).json({ success: false, msg: 'Token not Provided!'});
    }
    console.log(authToken);
    const token = authToken.split(' ')[1];

    try {
        const dcdToken = jwt.verify(token, process.env.JWT_SECRET);
        const  { userId, name } = dcdToken;
        req.creds = { userId, name };
        next();
    } catch (error) {
        return res.status(403).json({success: false, msg: `Invalid Token Signature`});
    }
}

module.exports = authCheck;