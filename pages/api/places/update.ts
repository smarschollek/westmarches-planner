import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const validationSchema = object({
	_id: string().required(),
	name: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('places');

		const id = req.body._id;
		delete req.body._id;
		
		await collection.updateOne({'_id' : id}, req.body);
		await client.close();
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;