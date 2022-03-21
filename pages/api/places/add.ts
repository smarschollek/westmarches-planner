import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { placeService } from '../../../modules/places/place-service';
import { validateSession } from '../../../helper/validate-session';

const validationSchema = object({
	name: string().required(),
	description: string(),
	imageId: string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		const session = await validateSession(req);
		await validationSchema.validate(req.body);
		
		await placeService.create({
			...req.body,
			creator: session.user?.name
		});
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;