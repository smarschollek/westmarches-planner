import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';

import { placeService } from '../../../modules/places/place-service';

interface UpdatePlaceRequest {
	_id: string,
	name: string,
	description: string
	imageGuid: string
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	description: string(),
	imageGuid: string()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		const request = req.body as UpdatePlaceRequest;
		placeService.update(request);
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;