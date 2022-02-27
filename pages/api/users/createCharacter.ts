import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { number, object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';

type CreateCharacterRequest = {
    name: string
    description?: string
    level: number,
    class: string
}

const schema = object({
	name: string().required(),
	level: number().required().min(1).max(20),
	class: string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSession({req});
		if(!session) {
			throw new Error('session is not valid');
		}

		const request: CreateCharacterRequest= req.body;

		const {client, database} = await mongoDbHelper.connect();
		const userCollection = database.collection('users');
		await userCollection.updateOne({'email' : session.user?.email}, { $push: {'characters' : request } });
		await client.close();
		res.status(200).json('');
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;