import { TErrorSource, TGenericErrorResponse } from '../../interface/error';
import httpStatus from 'http-status';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const error: TErrorSource = [
        {
            path: '',
            message: `${extractedMessage} already exists`
        }
    ];
    const statusCode = httpStatus.BAD_REQUEST;
    return {
        statusCode,
        message: 'Validation Error',
        error
    };
};
