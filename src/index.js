import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/users.routes.js';
import booksRoutes from './routes/books.routes.js';
import categoryBookRoutes from './routes/categoryBook.routes.js';
import loansRoutes from './routes/loans.routes.js';
import roleRoutes from './routes/role.routes.js';
import lotRoutes from './routes/lot.routes.js';
import returnRoutes from './routes/return.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api', booksRoutes);
app.use('/api', categoryBookRoutes);
app.use('/api', loansRoutes);
app.use('/api', roleRoutes);
app.use('/api', returnRoutes);
app.use('/api', authRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
