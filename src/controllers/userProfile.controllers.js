import { userProfileModel } from '../models/userProfile.models.js'


const getUserProfile = async (req, res) => {
  try {
    const email = req.email
    const profile = await userProfileModel.getUserProfile(email)

    if (!profile) {
      return res.status(404).json({ ok: false, msg: 'User profile not found' })
    }

    res.status(200).json({ ok: true, data: profile })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    res.status(500).json({ ok: false, msg: 'Error fetching user profile' })
  }
}

const updateUserProfile = async (req, res) => {
    try {
      const email = req.email
      const { name, lastname, id_card, email: newEmail, birthdate } = req.body
      
      if (!name || !lastname || !id_card || !newEmail || !birthdate) {
        return res.status(400).json({ ok: false, msg: 'Missing required fields' })
      }
      
      const updatedProfile = await userProfileModel.updateUserProfile(email, { name, lastname, id_card, newEmail, birthdate })
  
      res.status(200).json({ ok: true, msg: 'Profile updated successfully', data: updatedProfile })
    } catch (error) {
      console.error('Error updating user profile:', error)
      res.status(500).json({ ok: false, msg: 'Error updating user profile' })
    }
  }

export const userProfileControllers = { getUserProfile, updateUserProfile }
