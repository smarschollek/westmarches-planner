import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const validationSchema = object({
	_id: string().required(),
	name: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('places');

		const place = {...req.body};
		delete place._id;
		delete place.quests;

		const id = req.body._id;
		
		await collection.updateOne({'_id' : new ObjectId(id)}, {$set: {...place}});
		await client.close();
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;