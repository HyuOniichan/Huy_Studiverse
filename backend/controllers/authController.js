const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userData = require('../models/userModel');


// BUG: CAN'T HANDLE CHECK DUPLICATE USERNAME/ EMAIL


class authController {
    // [POST] /auth/register
    register(req, res) {
        const { username, email, password, role } = req.body;
        userData.find({ $or: [{ username: username }, { email: email }] })
            .then(data => {
                if (data && data.length) {
                    if (data[0].username == username) res.status(409).json({
                        error: 'username_taken',
                        message: `This username is already taken`
                    })
                    else res.status(409).json({
                        error: 'email_taken',
                        message: `This email is already used`
                    })
                } else {
                    bcrypt.hash(password, 10)
                        .then(hashPass => {
                            const newUser = {
                                username: username,
                                email: email,
                                password: hashPass,
                                role: role,
                                avatar: '',
                                about: '',
                                enrolled_courses: [],
                                created_courses: [],
                            }
                            userData.create(newUser)
                                .then(createdUser => res.status(201).json(createdUser))
                                .catch(err => {
                                    console.log(err)
                                    res.status(400).json({
                                        error: 'error',
                                        message: 'An error occured'
                                    })
                                })
                        })
                        .catch(() => res.status(400).json({
                            error: 'wrong_password',
                            message: 'Invalid password'
                        }))
                }
            })
            .catch(() => res.status(400).json({
                error: 'error_email',
                message: 'Cannot check the email'
            }))
    }

    // [POST] /auth/login
    login(req, res) {
        userData.findOne({ email: req.body.email })
            .then(result => {
                bcrypt.compare(req.body.password, result.password, (err, check) => {
                    if (err) return res.status(400).json({
                        error: 'error',
                        message: 'An error occured'
                    })
                    if (!check) {
                        return res.status(400).json({
                            error: 'wrong_password',
                            message: 'Invalid password'
                        })
                    }
                    const { password, ...user } = result.toJSON();
                    const accessToken = jwt.sign(
                        { userId: user._id, role: user.role },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '10m' }
                    )
                    res.cookie('jwt', accessToken, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    return res.status(201).json({
                        message: 'Success'
                    })
                })
            })
            .catch(() => res.status(404).json({
                error: 'user_not_found', 
                message: 'User not found'
            }))
    }

    // [POST] /auth/logout
    logout(req, res) {
        res.cookie('jwt', '', { maxAge: 0 })
        res.json({
            message: 'Logged out'
        })
    }

}

module.exports = new authController(); 
