import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Place, Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {	
	const {client, database} = await mongoDbHelper.connect();
	
	const placesCollection = database.collection('places');
	const questsCollection = database.collection('quests');

	const places = await placesCollection.find<Place>({}).toArray();

	for (let i = 0; i < places.length; i++) {
		const place = places[i];
		const quest = await questsCollection.find<Quest>({'placeId': place._id }).toArray();
		place.questCount = quest.length;
	}

	res.status(200).json(places);
	client.close();
};

export default handler;