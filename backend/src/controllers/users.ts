import express from 'express';

import { getUsers, deleteUser as deleteUserFromDb, getUserById} from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserFromDb(id);

        return res.json(deletedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).send('Username is required');
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};