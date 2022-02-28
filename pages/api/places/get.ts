import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { Place, PlaceModel } from '../../../models/place-model';
import { Quest } from '../../../models/quest-model';

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

		dbConnect();

		const place = await PlaceModel.findById<Place>(id);
		if(!place) {
			throw new Error(`no place with ${id} found`);
		}

		const result : GetPlaceResponse = {
			_id: place._id,
			description: place.description,
			name: place.name,
			imageGuid: place.imageGuid
		};

		// if(includeQuests) {
		// 	const quests = await QuestModel.find({'placeId' : place._id});
		// 	const result: any = {
		// 		...place,
		// 		quests
		// 	};
		// 	res.status(200).json(result);
		// } else {
		// 	res.status(200).json(place);
		// }

		res.status(200).json(result);
	} catch(error : any) {
		res.status(500).json(error);
	} finally {
		
	}
};

export default handler;