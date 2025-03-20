

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); 
    if (!token) {
        return res.status(401).json({message: 'Accès interdit'});
    }

    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified; 
        next();
    } catch (error) {
        return res.status(400).json({message: "Token Invalid"});
    }
};
 module.exports = authMiddleware;

//  const generateToken = (user) => {

//     return jwt.sign(
//         { id: user._id }, 'secret_key', 
//         { expiresIn: '1h' });

// };
// module.exports = generateToken;