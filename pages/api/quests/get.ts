import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { QuestModel } from '../../../models/quest-model';

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

		dbConnect();
		
		const data = await QuestModel.findById(id);
		
		if(!data) {
			throw new Error(`quest with ${id} not found`);
		}
		
		res.status(200).json(data);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;