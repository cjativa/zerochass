import * as express from 'express';

export interface ExpressRequest extends express.Request {
    uid: string;
}