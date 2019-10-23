import * as express from 'express';
import { UserService } from '../services/userService';
import { ExpressRequest } from '../interfaces/expressRequest';

export class UserController {

    private us: UserService;

    handler = async (request: ExpressRequest, response: express.Response, next) => {

        const { uid } = request;
        this.us = await UserService.createInstance(uid);

        next();
    }

    getProfile = async (request: ExpressRequest, response: express.Response) => {
       
        const data = await this.us.getProfile();
        response.json(data);
    }

    getAccount = async (request: ExpressRequest, response: express.Response) => {

        const data = await this.us.getAccount();
        response.json(data);
    }

    updateProfile = async (request: ExpressRequest, response: express.Response) => {
        
        const payload = request.body;
        await this.us.updateProfile(payload);
        response.json('updated');
    }

    /* updateAccount = async (request: ExpressRequest, response: express.Response) => {


    } */
}