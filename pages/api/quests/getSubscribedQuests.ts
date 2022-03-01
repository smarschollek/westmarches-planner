import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { checkHttpMethod } from '../../../helper/http-method';
import { validateSession } from '../../../helper/validate-session';
import { QuestModel } from '../../../models/quest-model';
import { UserModel } from '../../../models/user-model';

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		checkHttpMethod(req, 'GET');
		const session = await validateSession(req);
		const user = await UserModel.findById(session.id);
		if(!user) {
			throw new Error();
		}

		const quests = await QuestModel.where('_id').in(user.subscribedQuests).exec();
		res.status(200).json(quests);
	} catch (error) {
		res.status(500).json('');
	} 
};

export default handler;