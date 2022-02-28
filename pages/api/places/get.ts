import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { PlaceModel } from '../../../models/place-model';
import { QuestModel } from '../../../models/quest-model';


type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	let {id, includeQuests} = req.query;
	
	try {
		if(!id) {
			throw new Error;
		}
        
		if(Array.isArray(id)) {
			id = id[0];
		}

		dbConnect();

		const data = await PlaceModel.findOne({'_id' : new ObjectId(id)});
		if(!data) {
			throw new Error(`no place with ${id} found`);
		}

		if(includeQuests) {
			const quests = await QuestModel.find({'placeId' : data._id});
			const result: any = {
				...data,
				quests
			};
			res.status(200).json(result);
		} else {
			res.status(200).json(data);
		}
	} catch(error : any) {
		res.status(500).json(error);
	} finally {
		
	}
};

export default handler;