import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { placeService } from '../../../modules/places/place-service';
import { Place } from '../../../modules/places/place-types';
import { questService } from '../../../modules/quests/quest-service';

export type AllPlacesRespone = Place & {
	questCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<AllPlacesRespone[]>) => {	
	
	await dbConnect();
	const result : AllPlacesRespone[] = [];
	const places = await placeService.getAll();
	places.forEach(async (place) => {
		const quests = await questService.getByPlaceId(place._id);
		result.push({ ...place, questCount: quests.length });
	});
	res.status(200).json(result);
};

export default handler;