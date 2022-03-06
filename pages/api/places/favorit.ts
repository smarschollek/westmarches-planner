import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { PlaceModel } from '../../../models/place-model';
import { UserModel } from '../../../models/user-model';

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

		const user = await UserModel.findById(session.id);
		if(user) {
			const index = user.favoritPlaces.findIndex(x=>x.placeId === request.placeId);
			if(index !== -1) {
				user.favoritPlaces.splice(index,1);
			} else {

				const place = await PlaceModel.findById(request.placeId);
				if(!place) {
					throw new Error('place not found');
				}
				
				user.favoritPlaces.push({
					placeId: place._id,
					name: place.name
				});

			}
			await user.save();
		}
		res.status(200).json('');
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;