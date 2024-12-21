import AppError from '../../app/utils/AppError';
import { TLoginUser, TUser, TUserWithId } from './user_auth.interface';
import { User } from './user_auth.model';
import httpStatus from 'http-status';
import { createToken } from './user_auth.utils';
import config from '../../app/config';

const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user);
    return {
        _id: result._id,
        name: result.name,
        email: result.email
    };
};

const loginUser = async (payload: TLoginUser) => {
    const user = (await User.isUserExistsByEmail(payload.email)) as TUserWithId;

    if (!user) {
        throw new AppError(401, 'Invalid credentials');
    }

    if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(401, 'Invalid credentials');
    }

    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
        userId: user._id
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken
    };
};

export const UserServices = {
    createUserIntoDB,
    loginUser
};
