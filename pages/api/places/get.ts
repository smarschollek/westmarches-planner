import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { placeService } from '../../../modules/places/place-service';
import { Place } from '../../../modules/places/place-types';
import { questService } from '../../../modules/quests/quest-service';
import { Quest } from '../../../modules/quests/quest-types';

export type GetPlaceResponse = Place & {
	quests?: Quest[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<GetPlaceResponse>) => {
	let {id, includeQuests} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
        
		if(Array.isArray(id)) {
			id = id[0];
		}

		const place = await placeService.getById(id);
		if(!place) {
			throw new Error(`no place with ${id} found`);
		}

		let result : GetPlaceResponse = { ...place };
		if(includeQuests) {
			const quests = await questService.getByPlaceId(place._id);
			result = { ...result, quests };
		}

		res.status(200).json(result);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;