/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_SuccessResponse } from '../models/models_SuccessResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Login a user
     * Login a user with email/username and password
     * @returns models_SuccessResponse OK
     * @throws ApiError
     */
    public static postAuthLogin(): CancelablePromise<models_SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            errors: {
                400: `Bad Request`,
                409: `Conflict`,
            },
        });
    }
    /**
     * Register a new user
     * Register a new user with email, username, and password
     * @returns models_SuccessResponse OK
     * @throws ApiError
     */
    public static postAuthRegister(): CancelablePromise<models_SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            errors: {
                400: `Bad Request`,
                409: `Conflict`,
            },
        });
    }
}
