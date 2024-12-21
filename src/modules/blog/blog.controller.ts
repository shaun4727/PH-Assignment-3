import sendResponse from '../../app/middleware/sendResponse';
import catchAsync from '../../app/utils/catchAsync';
import { TUserWithId } from '../user-auth/user_auth.interface';
import { User } from '../user-auth/user_auth.model';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
    const user = (await User.isUserExistsByEmail(req.user.userEmail)) as TUserWithId;
    const blog = req.body;
    blog.author = user._id;
    const result = await BlogServices.createBlogIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        data: result
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const blog = req.body;
    const result = await BlogServices.updateSingleBlogIntoDB(id, blog, req.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog updated successfully',
        data: result
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    await BlogServices.deleteSingleBlogIntoDB(id, req.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully'
    });
});

const getBlogs = catchAsync(async (req, res) => {
    const blogs = await BlogServices.getAllBlogFromDB(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs fetched successfully',
        data: blogs
    });
});

export const BlogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs
};
