import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { ObjectId } from 'mongodb';


type Response = {

}

const validationSchema = object({
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
		collection.insertOne(quest);

		res.status(200).json('');
		client.close();
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;