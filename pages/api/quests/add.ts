import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { ObjectId } from 'mongodb';
import { apiProtector } from '../../../helper/api-protector';


type Response = {

}

const validationSchema = object({
	name: string().required(),
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const quest = {
			...req.body,
			placeId: new ObjectId(req.body.placeId)
		};

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');
		await collection.insertOne(quest);
		await client.close();
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;