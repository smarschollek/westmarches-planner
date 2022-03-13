import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { userService } from '../../../modules/users/user-service';

const requestSchema = object({
	name: string().required(),
	email: string().email().required(),
	password: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await requestSchema.validate(req.body);
		const existingUsers = await userService.getByEmail(req.body.email);
		if(existingUsers) {
			throw new Error('user with same email already exists');
		}

		await userService.register(req.body);
		res.status(201).json({message: 'user created'});
	} catch (error : any) {
		res.status(500).json({message: error.message});
	}
};

export default handler;