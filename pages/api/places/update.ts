import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { PlaceModel } from '../../../models/place-model';

interface UpdatePlaceRequest {
	_id: string,
	name: string,
	description: string
	imageGuid: string
}

const validationSchema = object({
	_id: string().required(),
	name: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const body = req.body as UpdatePlaceRequest;

		dbConnect();
		const place = await PlaceModel.findById(req.body._id);
		
		if(place) {
			place.name = body.name;
			place.description = body.description;
			place.imageGuid = body.imageGuid;
			await place.save();
		}
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;