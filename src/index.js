import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import usersRouter from './routes/users.routes.js'
import rolesRouter from './routes/roles.routes.js'
import booksRouter from './routes/books.routes.js'
import categoryBooksRouter from './routes/categoryBooks.routes.js'
import loansRouter from './routes/loans.routes.js'
import reservationsRouter from './routes/reservations.routes.js'
import returnRouter from './routes/return.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'
import userProfileRouter from './routes/userProfile.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: [GET, POST, PUT, DELETE],
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/users', usersRouter)
app.use('/api/roles', rolesRouter)
app.use('/api/books', booksRouter)
app.use('/api/categoryBooks', categoryBooksRouter)
app.use('/api/loans', loansRouter)
app.use('/api/reservations', reservationsRouter)
app.use('/api/return', returnRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/userProfile', userProfileRouter)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('Server running at '+PORT))
