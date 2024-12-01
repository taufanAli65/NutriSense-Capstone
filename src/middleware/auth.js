var { auth } = require('../database/config');

async function authenticateToken(req, res, next) {
    const idToken = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!idToken) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        req.user = decodedToken; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
}

module.exports = { authenticateToken }