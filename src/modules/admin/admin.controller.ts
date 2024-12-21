import sendResponse from '../../app/middleware/sendResponse';
import catchAsync from '../../app/utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    await AdminServices.blockUserIntoDB(userId, req.user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User blocked successfully'
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    await AdminServices.deleteSingleBlogFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully'
    });
});

export const AdminControllers = {
    blockUser,
    deleteBlog
};
