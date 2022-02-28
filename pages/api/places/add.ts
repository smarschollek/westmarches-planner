import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';

import { apiProtector } from '../../../helper/api-protector';
import { PlaceModel } from '../../../models/place-model';
import { dbConnect } from '../../../helper/db-connect';

const validationSchema = object({
	name: string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);

		dbConnect();
		await PlaceModel.create(req.body);
		
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;