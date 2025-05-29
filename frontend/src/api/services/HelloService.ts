/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_HelloResponse } from '../models/models_HelloResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HelloService {
    /**
     * Returns a Hello message
     * Simple hello endpoint
     * @returns models_HelloResponse OK
     * @throws ApiError
     */
    public static getHello(): CancelablePromise<models_HelloResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hello',
        });
    }
}
