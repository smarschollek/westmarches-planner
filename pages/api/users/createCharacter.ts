import type { NextApiRequest, NextApiResponse } from 'next';
import { number, object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { userService } from '../../../modules/users/user-service';
import { Character } from '../../../modules/users/user-types';

type CreateCharacterRequest = Character

const schema = object({
	name: string().required(),
	level: number().required().min(1).max(20),
	class: string().required(),
	description: string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'POST') {
		res.status(404).send('');
		return;
	}

	try {
		await schema.validate(req.body);

		const session = await validateSession(req);
		const body = req.body as CreateCharacterRequest;
		await userService.addCharacter(session.user?.email!, body);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;