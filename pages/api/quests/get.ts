import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { questService } from '../../../modules/quests/quest-service';

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	let {id} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
		if(Array.isArray(id)) {
			id = id[0];
		}

		const data = await questService.getById(id);
		res.status(200).json(data);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;