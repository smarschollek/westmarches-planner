import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { placeService } from '../../../modules/places/place-service';
import { userService } from '../../../modules/users/user-service';


export interface SetFavoritPlaceRequest {
    placeId: string
}

const schema = object({
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);
		await schema.validate(req.body);
		const request = req.body as SetFavoritPlaceRequest;
		const place = await placeService.getById(request.placeId);
		if(place) {
			await userService.toggleFavoritPlace(session.id, place);
		}
		
		res.status(200).json('');
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;