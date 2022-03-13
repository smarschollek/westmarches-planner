import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { authHelper } from '../../../helper/auth';
import { dbConnect } from '../../../helper/db-connect';
import { UserModel } from '../../../modules/users/user-model';

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
		
		await dbConnect();
		const existingUsers = await UserModel.findOne({'email' : user.email });
		if(existingUsers) {
			throw new Error('user with same email already exists');
		}

		await UserModel.create({
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