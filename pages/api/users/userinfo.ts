import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { Character, FavoritPlace, SubscribedQuest, UserModel } from '../../../models/user-model';

interface UserInfoResponse {
    characters: Character[],
    subscribedQuests: SubscribedQuest[],
    favoritPlaces: FavoritPlace[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);

		const user = await UserModel.findById(session.id);
		if(!user) {
			throw new Error('user unknown');
		}
        
		const response : UserInfoResponse = {
			characters: user.characters,
			favoritPlaces: user.favoritPlaces,
			subscribedQuests: user.subscribedQuests
		};

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json('');
	}
};

export default handler;