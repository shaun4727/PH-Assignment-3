import httpStatus from 'http-status';
import config from '../../app/config';
import sendResponse from '../../app/middleware/sendResponse';
import catchAsync from '../../app/utils/catchAsync';
import { UserServices } from './user_auth.service';

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: result
    });
});

const userLogin = catchAsync(async (req, res) => {
    const result = await UserServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login succesful',
        data: {
            token: accessToken
        }
    });
});

export const UserControllers = {
    createUser,
    userLogin
};
