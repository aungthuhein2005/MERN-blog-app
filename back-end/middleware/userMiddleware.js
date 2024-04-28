const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(token){
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token,jwtSecretKey);
        if(verified){
            next();
        }else{
            return res.status(401).json({ message: 'Unauthorized - Missing token' });
        }
    }
}

