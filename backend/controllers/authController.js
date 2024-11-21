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
                    if (data[0].username == username) res.status(409).send('This username was used')
                    else res.status(409).send('This email was used')
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
                                .then(createdUser => res.send(createdUser))
                                .catch(err => {
                                    console.log(err)
                                    res.status(400).send('An error occured')
                                })
                        })
                        .catch(() => res.status(400).send('Invalid password'))
                }
            })
            .catch(() => res.status(400).send('Cannot check the email'))
    }

    // [POST] /auth/login
    login(req, res) {
        userData.findOne({ email: req.body.email })
            .then(result => {
                bcrypt.compare(req.body.password, result.password, (err, check) => {
                    if (err) return res.status(400).send("An error occured")
                    if (!check) {
                        return res.status(400).send("Invalid password")
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
                    return res.send('Success')
                })
            })
            .catch(() => res.status(404).send("User not found"))
    }

    // [POST] /auth/logout
    logout(req, res) {
        res.cookie('jwt', '', { maxAge: 0 })
        res.send('Logged out')
    }

}

module.exports = new authController(); 
