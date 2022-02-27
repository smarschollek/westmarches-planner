import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);

		const entity = {
			...req.body,
			placeId: new ObjectId(req.body.placeId)
		};

		await mongoDbHelper.update('quests', req.body._id, entity);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;