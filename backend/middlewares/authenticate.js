const jwt = require('jsonwebtoken');

const userRole = {
    admin: 'admin', 
    guest: 'guest', 
    student: 'student', 
    teacher: 'teacher'
}

function authenticate(req, res, next) {
    const token = req.cookies['jwt'];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(401).json({
            error: 'unauthorized', 
            message: 'You need to authenticate'
        }); 
        if (!data) return res.status(404).json({
            error: 'not_found', 
            message: 'Data not found'
        }); 
        req.body = {
            ...req.body, 
            ...data
        }
        next();
    })
}

function authRole(role) {
    return (req, res, next) => {
        if (!role.includes(req.body.role)) res.status(403).json({
            error: 'forbidden', 
            message: 'You are not allowed to do this'
        }); 
        next(); 
    }
}

module.exports = { authenticate, userRole, authRole }; 
