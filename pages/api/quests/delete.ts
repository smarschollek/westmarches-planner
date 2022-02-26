import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const handler = (req: NextApiRequest, res: NextApiResponse<Response>) => {
	try {
		const {id} = req.query;

		if(!id) {
			throw new Error('id is not set');
		}

		if(Array.isArray(id)) {
			mongoDbHelper.delete('quests', id[0]);
		} else{
			mongoDbHelper.delete('quests', id);
		}

		res.status(200).json('');
	}
	catch(error : any) {
		res.status(500).json(error);
	}

    
};

export default handler;