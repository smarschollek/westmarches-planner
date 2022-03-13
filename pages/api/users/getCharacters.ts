import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../modules/users/user-model';
import { Character, User } from '../../../modules/users/user-types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		res.status(404).json({});
		return;
	}

	await dbConnect();

	const session = await validateSession(req);
	const user = await UserModel.findOne<User>({'email' : session.user!.email});
	
	if(!user) {
		throw new Error('no user found');
	}

	const charactes : Character[] = JSON.parse(JSON.stringify(user.characters));

	res.status(200).json(charactes);    
};

export default handler;