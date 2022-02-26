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
		await mongoDbHelper.add('places', req.body);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;