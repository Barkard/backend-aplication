import bcryptjs from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { usersModel } from "../models/users.models.js"


const register = async (req, res) => {
    try {
        console.log(req.body)
        const {name, lastname, id_card, email, password, birthdate} = req.body
        if (!name || !lastname || !id_card || !email || !password || !birthdate) {
            return res.status(400).json({ok: false, msg: 'Missing required fields: name, lastname, id_card, email, password, birthdate'})
        }

        const users = await usersModel.findOneByEmail(email)
        if(users) {
            return res.status(409).json({ok: false, msg: 'Email already exists.'})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await usersModel.create({name, lastname, id_card, email, password: hashedPassword, birthdate})

        const token = jwt.sign({
            email: newUser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )

        return res.status(201).json({ok: true, token: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : 'Error Server'
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({ok: false, msg: 'Missing required fields: email, password'})
        }

        const users = await usersModel.findOneByEmail(email)
        if(!users){
            return res.status(404).json({ok: false, msg: 'User not found'});
        }

        const isMatch = await bcryptjs.compare(password, users.password)

        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token = jwt.sign({email: users.email},
        process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({ok: true, msg: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : 'Error Server'
        })
    }
}

const profile = async(req, res) => {
    try {
        
        const users=await usersModel.findOneByEmail(req.email)
        return res.json({ok: true, msg: users})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok : false,
            msg : 'Error Server'
        })
    }
}

const logout = (req, res) => {
    return res.status(200).json({ ok: true, msg: "Logout successful" })
}

const sendRecoveryEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })

    const url = `http://localhost:4000/api/users/reset-password/${token}`

    await transporter.sendMail({
        from: '"Library App" <noreply@libraryapp.com>',
        to: email,
        subject: "Password Recovery",
        html: `<p>Click <a href="${url}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    })
}

const recoverPassword = async (req, res) => {
    const {email} = req.body

    try {
        const user = await usersModel.findOneByEmail(email);
        if(!user) {
            return res.status(404).json({ok: false, msg: 'User not found'})
        }

        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, { expiresIn: '15m'})

        await sendRecoveryEmail(email, token);

        return res.status(200).json({ok: true, msg: 'Recovery email sent'})
    } catch (error) {
        console.error(error)

        return res.status(500).json({ok:false, msg: 'Error sending recovery email'})
    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body

    if (!token) {
        return res.status(400).json({ ok: false, msg: "Token must be provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)

        await usersModel.updatePasswordByEmail(email, hashedPassword)

        return res.status(200).json({ ok: true, msg: "Password updated successfully" })
    } catch (error) {
        console.error(error)
        return res.status(400).json({ ok: false, msg: "Invalid or expired token" })
    }
};


const getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers()
        return res.json({ok: true, msg: users})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving the users' })
    }
}

const getUsersById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await usersModel.getUsersById(id)
        if (!user) {
            return res.status(404).json({ ok: false, msg: 'User not found' })
        }

        const { password, ...userWithoutPassword } = user

        res.status(200).json({ ok: true, data: userWithoutPassword })
    } catch (error) {
        console.error('Error fetching user by ID:', error)
        res.status(500).json({ ok: false, msg: 'Internal server error' })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { id_role, name, lastname, id_card, email, birthdate, is_active } = req.body
        const updatedUser = await usersModel.updateUser(id, { id_role, name, lastname, id_card, email, birthdate, is_active })

        if (!updatedUser) {
            return res.status(404).json({ ok: false, msg: 'User not found' })
        }

        res.status(200).json({ ok: true, data: updatedUser })
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ ok: false, msg: 'Error updating user' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const deletedUser = await usersModel.deleteUser(id)
        
        if(!deletedUser) {
            return res.status(404).json({ok: false, msg: 'User not found'})
        }

        res.status(200).json({ok: true, msg: 'User deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ok: false, msg: 'Error deleting user'})
    }
}

export const usersControllers = { register, login, profile, logout, sendRecoveryEmail, recoverPassword, resetPassword, getUsers, getUsersById, updateUser, deleteUser }
