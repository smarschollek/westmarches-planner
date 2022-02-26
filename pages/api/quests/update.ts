import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	place: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		await mongoDbHelper.update('quests', req.body._id, req.body);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;