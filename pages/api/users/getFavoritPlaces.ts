import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../modules/users/user-model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);

		const user = await UserModel.findById(session.id);
		if(!user) {
			throw new Error('user unknown');
		}
        
		res.status(200).json(user.favoritPlaces);
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;