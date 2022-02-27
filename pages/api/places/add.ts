import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';


type Response = {

}

const validationSchema = object({
	name: string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('places');
		await collection.insertOne(req.body);
		res.status(200).json('');
		client.close();
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;