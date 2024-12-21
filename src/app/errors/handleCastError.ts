import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../../interface/error';
import httpStatus from 'http-status';

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const error: TErrorSource = [
        {
            path: err.path,
            message: err.message
        }
    ];

    const statusCode = httpStatus.FORBIDDEN;
    return {
        statusCode,
        message: 'Validation Error',
        error
    };
};
