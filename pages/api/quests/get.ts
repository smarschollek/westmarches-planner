import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';

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

		const data = await mongoDbHelper.get('quests', id);
		res.status(200).json(data);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;