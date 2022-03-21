import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { QuestModel } from '../../../modules/quests/quest-model';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../modules/users/user-model';
import { userService } from '../../../modules/users/user-service';
import { Document } from 'mongodb';
import { User } from '../../../modules/users/user-types';
import { questService } from '../../../modules/quests/quest-service';

interface UnsubscribeQuestRequest {
    subscriberId: string
    questId: string
}

const schema = object({
	subscriberId: string().required(),
	questId:  string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);
		schema.validate(req.body);
		const request = req.body as UnsubscribeQuestRequest;
		await questService.unsubscribe({
			questId: request.questId,
			subscriberId: request.subscriberId
		});

		await userService.deleteSubscribedQuests(session.user?.email!, request.questId);
		res.status(200).send('');
	} catch (error) {
		res.status(500).send('');
	}
};

export default handler;