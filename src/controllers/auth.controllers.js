import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/users.models.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.uid_users, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Enviar respuesta
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.uid_users,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
