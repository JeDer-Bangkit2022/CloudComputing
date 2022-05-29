const User = require('../models/user');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).json({success: false, msg: 'Please provide email and password'});
        }
        const user = await User.findOne({email});
        
        if (!user){
            return res.status(401).json({success: false, msg: 'Invalid Credential'});
        }

        const isPasswordCorrect = await user.checkPasswd(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({success: false, msg: 'Invalid Credential'});
        }

        const token = user.generateJWT();
        res.status(200).json({success: true, user: { id: user._id, name: user.name }, token});   
    } catch (error) {
        
    }
}

const register = async(req, res) => {
    try {
        const user = await User.create({...req.body});
        res.status(201).json({ success: true, user: {id: user._id, name: user.name}});
    } catch (error) {
        return res.status(500).json({success: false, msg: error});
    }
}

module.exports = { login, register }

