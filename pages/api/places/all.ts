import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Place, Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const places = await mongoDbHelper.getAll<Place>('places');
	
	for (let i = 0; i < places.length; i++) {
		const place = places[i];
		const quest = await mongoDbHelper.query<Quest>('quests', {'placeId': place._id });

		place.questCount = quest.length;
	}

	res.status(200).json(places);
};

export default handler;