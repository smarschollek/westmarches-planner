import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { Place, PlaceModel } from '../../../models/place-model';
import { QuestModel } from '../../../models/quest-model';

type AllPlacesRespone = Place & {
	questCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<AllPlacesRespone[]>) => {	
	
	dbConnect();
	const result : AllPlacesRespone[] = [];
	const places = await PlaceModel.find<Place>({});
	
	for (let i = 0; i < places.length; i++) {
		const place = places[i];
		const quests = await QuestModel.where('placeId').equals(place._id);	
		
		result.push({
			_id: place._id,
			name: place.name,
			description: place.description,
			imageGuid: place.imageGuid,
			questCount: quests.length
		});
	}
	
	res.status(200).json(result);
};

export default handler;