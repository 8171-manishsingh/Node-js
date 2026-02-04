import express from 'express'
import { checkAuth, checkAdmin } from '../middlewares/auth_middleware.js'
import { getAllUsers, deleteUser, getUserById, addUserByAdmin, updateProfileByAdmin, updateProfileByUser } from '../controllers/user_controller.js'

const router = express.Router()

router.use(checkAuth)
router.post('/add-user', checkAdmin, addUserByAdmin)
router.get('/get-all-users', checkAdmin, getAllUsers)
router.get('/get-user-by-id', checkAdmin, getUserById)
router.put('/update-profile-by-admin', checkAdmin, updateProfileByAdmin)
router.put('/update-profile-by-user', updateProfileByUser)
router.delete('/delete-user', checkAdmin, deleteUser)

export default router
