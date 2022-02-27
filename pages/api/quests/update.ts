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

		const quest = {
			...req.body,
			placeId: new ObjectId(req.body.placeId)
		};

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');
		collection.updateOne(req.body._id, quest);

		res.status(200).json('');
		client.close();
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;