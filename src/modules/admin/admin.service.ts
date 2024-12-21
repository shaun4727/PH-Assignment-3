import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user-auth/user_auth.model';
import { USER_ROLE } from '../user-auth/user_auth.constant';
import AppError from '../../app/utils/AppError';
import { Blog } from '../blog/blog.model';

const blockUserIntoDB = async (id: string, user: JwtPayload) => {
    if (user.role != USER_ROLE.admin) {
        throw new AppError(403, 'You are not authorized to block!');
    }

    const result = await User.findOneAndUpdate({ _id: id }, { isBlocked: true }, { new: true });

    if (!result) {
        throw new AppError(404, 'User does not exist!');
    }
};

const deleteSingleBlogFromDB = async (id: string) => {
    const result = await Blog.findOneAndUpdate({ _id: id }, { isPublished: false }, { new: true });

    if (!result) {
        throw new AppError(400, 'Blog not Found!');
    }
};
export const AdminServices = {
    blockUserIntoDB,
    deleteSingleBlogFromDB
};
