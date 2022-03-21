import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../modules/users/user-model';
import { userService } from '../../../modules/users/user-service';
import { Character, FavoritPlace, SubscribedQuest } from '../../../modules/users/user-types';

interface UserInfoResponse {
	roles: string[],
    characters: Character[],
    subscribedQuests: SubscribedQuest[],
    favoritPlaces: FavoritPlace[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);

		const user = await userService.getByEmail(session.user?.email!);
		if(!user) {
			throw new Error('user unknown');
		}

		const response : UserInfoResponse = {
			roles: [],
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