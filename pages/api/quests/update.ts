import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);

		const id = req.body.id;
		const quest = {
			...req.body,
			placeId: new ObjectId(req.body.placeId)
		};
		delete quest._id;

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');
		await collection.updateOne({'_id' : new ObjectId(id)}, {$set: {...quest}});
		await client.close();
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;