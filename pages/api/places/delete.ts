import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { PlaceModel } from '../../../models/place-model';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	try {
		const {id} = req.query;

		if(!id) {
			throw new Error('id is not set');
		}

		dbConnect();
				
		if(Array.isArray(id)) {
			await PlaceModel.deleteOne({'_id' : id[0]});
		} else{
			await PlaceModel.deleteOne({'_id' : id});
		}

		
		res.status(200).json('');
	}
	catch(error : any) {
		res.status(500).json(error);
	}

    
};

export default handler;