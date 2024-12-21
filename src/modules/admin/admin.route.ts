import express from 'express';
import { USER_ROLE } from '../user-auth/user_auth.constant';
import auth from '../../app/middleware/auth';
import { AdminControllers } from './admin.controller';
const router = express.Router();

router.patch('/users/:userId/block', auth(USER_ROLE.admin), AdminControllers.blockUser);
router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminControllers.deleteBlog);

export const AdminRoutes = router;
