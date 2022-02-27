import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	try {
		const {id} = req.query;

		if(!id) {
			throw new Error('id is not set');
		}

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');

		if(Array.isArray(id)) {
			collection.deleteOne({'_id' : id[0]});
		} else{
			collection.deleteOne({'_id' : id});
		}

		res.status(200).json('');
		client.close();
	}
	catch(error : any) {
		res.status(500).json(error);
	}

    
};

export default handler;