import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { placeService } from '../../../modules/places/place-service';
import { Place } from '../../../modules/places/place-types';
import { questService } from '../../../modules/quests/quest-service';

export type AllPlacesRespone = Place & {
	questCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<AllPlacesRespone[]>) => {	
	const places = await placeService.getAll() as AllPlacesRespone[];
	for(const place of places) {
		const quests = await questService.getByPlaceId(place._id);
		place.questCount = quests.length;
	}
	res.status(200).json(places);
};

export default handler;