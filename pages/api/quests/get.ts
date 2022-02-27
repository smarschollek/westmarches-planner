import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
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
		await client.close();
		res.status(200).json(data);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;