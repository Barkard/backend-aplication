import { reservationsModel } from '../models/reservations.models.js'


const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationsModel.getAllReservations()
        res.status(200).json({ ok: true, data: reservations })
    } catch (error) {
        console.error('Error fetching reservations:', error)
        res.status(500).json({ ok: false, msg: 'Error fetching reservations' })
    }
}


const getReservationsByUser = async (req, res) => {
    try {
        const { Uid_users } = req.params
        const reservations = await reservationsModel.getReservationsByUser(Uid_users)

        if (reservations.length === 0) {
            return res.status(404).json({ ok: false, msg: 'No reservations found for this user' })
        }

        res.status(200).json({ ok: true, data: reservations })
    } catch (error) {
        console.error('Error fetching reservations by user:', error)
        res.status(500).json({ ok: false, msg: 'Internal server error' })
    }
}


const addReservation = async (req, res) => {
    try {
        const { Uid_users, id_book, reservation_date, status } = req.body

        if (!Uid_users || !id_book || !reservation_date || !status) {
            return res.status(400).json({ ok: false, msg: 'Missing required fields' })
        }

        const newReservation = await reservationsModel.addReservation({ Uid_users, id_book, reservation_date, status })
        res.status(201).json({ ok: true, data: newReservation })
    } catch (error) {
        console.error('Error adding reservation:', error)
        res.status(500).json({ ok: false, msg: 'Error adding reservation' })
    }
}


const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params
        const deletedReservation = await reservationsModel.deleteReservation(id)

        if (!deletedReservation) {
            return res.status(404).json({ ok: false, msg: 'Reservation not found' })
        }

        res.status(200).json({ ok: true, msg: 'Reservation deleted successfully', data: deletedReservation })
    } catch (error) {
        console.error('Error deleting reservation:', error)
        res.status(500).json({ ok: false, msg: 'Error deleting reservation' })
    }
}


const updateReservation = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!status) {
            return res.status(400).json({ ok: false, msg: 'Missing status' })
        }

        const updatedReservation = await reservationsModel.updateReservation(id, { status })

        if (!updatedReservation) {
            return res.status(404).json({ ok: false, msg: 'Reservation not found' })
        }

        res.status(200).json({ ok: true, msg: 'Reservation updated successfully', data: updatedReservation })
    } catch (error) {
        console.error('Error updating reservation:', error)
        res.status(500).json({ ok: false, msg: 'Error updating reservation' })
    }
}

export const reservationsControllers = { getAllReservations, getReservationsByUser, addReservation, deleteReservation, updateReservation }
