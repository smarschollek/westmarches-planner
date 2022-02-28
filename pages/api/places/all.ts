import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { Place, PlaceModel } from '../../../models/place-model';

type AllPlacesRespone = Place & {
	questCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<AllPlacesRespone[]>) => {	
	
	dbConnect();

	const places = await PlaceModel.find<AllPlacesRespone>();
	
	
	res.status(200).json(places);
};

export default handler;