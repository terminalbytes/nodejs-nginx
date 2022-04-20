import { ResponseMessages } from "@utils/constants";

export const getRandInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const successResponseWrapper = (data: any) => {
    return {
        status: ResponseMessages.Success,
        ...data,
    };
};

export const failureResponseWrapper = (data: any) => {
    return {
        status: ResponseMessages.Failed,
        ...data,
    };
};