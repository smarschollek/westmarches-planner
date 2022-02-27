import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	try {
		const {id} = req.query;

		if(!id) {
			throw new Error('id is not set');
		}

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');

		if(Array.isArray(id)) {
			await collection.deleteOne({'_id' : id[0]});
		} else{
			await collection.deleteOne({'_id' : id});
		}
		await client.close();
		res.status(200).json('');
	}
	catch(error : any) {
		res.status(500).json(error);
	}

    
};

export default handler;