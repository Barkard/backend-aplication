import { Router } from "express";
import { usersControllers } from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router()

// Rutas de autenticación
router.post('/register', usersControllers.register);
router.post('/login', usersControllers.login);
router.post('/logout', verifyToken, usersControllers.logout);

// Perfil de usuario
router.get('/profile', verifyToken, usersControllers.profile);

// Recuperación de contraseña
router.post('/recover-password', usersControllers.recoverPassword);

// Mostrar formulario de restablecimiento (GET)
router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    res.send(`
        <h1>Reset Password</h1>
        <form action="/api/users/reset-password/${token}" method="POST">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <button type="submit">Reset Password</button>
        </form>
    `)
})

// Proceso para reestablecer contraseña
router.post('/reset-password/:token', usersControllers.resetPassword)

// Metodos (GET, POST, PUT, DELETE)
router.get('/', usersControllers.getUsers)
router.get('/:id', usersControllers.getUsersById)
router.put('/:id', usersControllers.updateUser)
router.delete('/:id', usersControllers.deleteUser)


export default router;
