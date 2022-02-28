import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { number, object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../models/user-model';

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
	if(req.method !== 'POST') {
		res.status(404).send('');
		return;
	}

	try {
		const session = await validateSession(req);
		const body = req.body as CreateCharacterRequest;

		dbConnect();
		
		const user = await UserModel.findOne({'email' : session.user!.email});
		if(user) {
			user.characters.push({
				id: Date.now().toString(),
				class: body.class,
				description: body.description ?? '',
				level: body.level,
				name: body.name
			});
			await user.save();
		}

		res.status(200).json('');
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;