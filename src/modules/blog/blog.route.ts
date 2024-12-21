import express from 'express';
import validateMiddleware from '../../app/middleware/validateRequest';
import { blogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import { USER_ROLE } from '../user-auth/user_auth.constant';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validateMiddleware(blogValidations.createBlogValidationSchema),
    BlogControllers.createBlog
);

router.patch(
    '/:id',
    auth(USER_ROLE.user),
    validateMiddleware(blogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog
);

router.delete('/:id', auth(USER_ROLE.user), BlogControllers.deleteBlog);
router.get('/', auth(USER_ROLE.user), BlogControllers.getBlogs);

export const BlogRoutes = router;
