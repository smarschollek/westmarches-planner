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

		const entity = {
			...req.body,
			placeId: new ObjectId(req.body.placeId)
		};

		await mongoDbHelper.add('quests', entity);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;