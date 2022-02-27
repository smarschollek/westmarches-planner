import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { authHelper } from '../../../helper/auth';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const requestSchema = object({
	name: string().required(),
	email: string().email().required(),
	password: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {

		const user = {...req.body};
		await requestSchema.validate(user);

		const hashedPassword = await authHelper.hashPassword(req.body.password);
		
		const existingUsers = await mongoDbHelper.query('users', {'email' : user.email });
		if(existingUsers.length !== 0) {
			throw new Error('user with same email already exists');
		}

		await mongoDbHelper.add('users', {
			...user,
			password: hashedPassword,
			isAdmin: false,
			isGamemaster: false
		});

		res.status(201).json({message: 'user created'});
	} catch (error : any) {
		res.status(500).json({message: error.message});
	}
};

export default handler;