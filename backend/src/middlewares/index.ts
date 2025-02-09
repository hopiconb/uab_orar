import express from 'express';
import { get, identity, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.status(401).send('Unauthorized');
        }

        if (currentUserId.toString() !== id) {
            return res.status(403).send('Forbidden');
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['sessionToken'];

        if (!sessionToken) {
            return res.status(401).send('Unauthorized');
        }

        const user = await getUserBySessionToken(sessionToken);

        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        merge(req, { identity: user });
        
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};