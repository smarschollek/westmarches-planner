import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Place } from '../../../types/dtos';

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

		const data = await mongoDbHelper.query<Place>('places', {'_id' : new ObjectId(id)});
		res.status(200).json(data[0]);
	} catch(error : any) {
		res.status(500).json(error);
	}
};

export default handler;