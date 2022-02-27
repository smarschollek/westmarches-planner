import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Place, Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {	
	const {client, database} = await mongoDbHelper.connect();
	
	const placesCollection = database.collection('places');
	const questsCollection = database.collection('quests');

	const places = await placesCollection.find<Place>({}).toArray();

	for (let i = 0; i < places.length; i++) {
		const place = places[i];
		const quest = await questsCollection.find<Quest>({'placeId': place._id }).toArray();
		place.questCount = quest.length;
	}

	await client.close();
	res.status(200).json(places);
};

export default handler;