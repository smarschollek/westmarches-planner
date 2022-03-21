import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { placeService } from '../../../modules/places/place-service';
import { Place } from '../../../modules/places/place-types';
import { questService } from '../../../modules/quests/quest-service';
import { Quest } from '../../../modules/quests/quest-types';

export type GetPlaceResponse = Place & {
	quests?: Quest[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	let {id, includeQuests} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
        
		if(Array.isArray(id)) {
			id = id[0];
		}

		const place = await placeService.getById(id) as GetPlaceResponse;
		if(!place) {
			throw new Error(`no place with ${id} found`);
		}

		if(includeQuests) {
			const quests = await questService.getByPlaceId(place._id.toString());
			place.quests = JSON.parse(JSON.stringify(quests));			
		}

		res.status(200).json(place);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;