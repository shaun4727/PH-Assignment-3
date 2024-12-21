import { ZodError } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../../interface/error';
import httpStatus from 'http-status';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const error: TErrorSource = err.issues.map((issue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        };
    });

    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        error
    };
};
