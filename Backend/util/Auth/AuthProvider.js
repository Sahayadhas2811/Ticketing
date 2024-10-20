const jwt = require('jsonwebtoken');

module.exports = {
    authProvider,
    adminAuthProvider
};

const authProvider = (req, res, next) => {
    // Get the Authorization header value (Bearer token)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    // If no token is found, return unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_Key);
        
        // Attach the decoded token (user info) to the req object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid token
        return res.status(403).json({ message: 'Invalid token. Access denied.' });
    }
};

const adminAuthProvider = (req, res, next)=>{
    if(req.user && req.user.role === 'Admin'){
        next();
    }else{
        return res.status(403).json({message:'Access Denied. Admin only'});
    }
}


