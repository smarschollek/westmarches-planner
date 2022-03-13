import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { questService } from '../../../modules/quests/quest-service';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	try {
		let {id} = req.query;

		if(!id) {
			throw new Error('id is not set');
		}

		if(Array.isArray(id)) {
			id = id[0];
		}

		questService.delete({_id : id});

		res.status(200).json('');
	}
	catch(error : any) {
		res.status(500).json(error);
	}

    
};

export default handler;