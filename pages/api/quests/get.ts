import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	let {id} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
        
		if(Array.isArray(id)) {
			id = id[0];
		}

		const {client, database} = await mongoDbHelper.connect();
		const collection = database.collection('quests');
		const data = await collection.findOne<Quest>({'_id' : new ObjectId(id)});
		
		if(!data) {
			throw new Error(`quest with ${id} not found`);
		}

		res.status(200).json(data);
		client.close();
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;