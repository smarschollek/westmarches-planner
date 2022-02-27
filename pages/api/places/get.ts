import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Place, PlaceWithQuests, Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	let {id} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
        
		if(Array.isArray(id)) {
			id = id[0];
		}

		const {client, database} = await mongoDbHelper.connect();

		const data = await database.collection('places').findOne<Place>({'_id' : new ObjectId(id)});
		if(!data) {
			throw new Error(`no place with ${id} found`);
		}

		const quests = await database.collection('quests').find<Quest>({'placeId' : data._id}).toArray();

		const result: PlaceWithQuests = {
			...data,
			quests
		};
		
		await client.close();
		res.status(200).json(result);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;