import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { QuestModel } from '../../../modules/quests/quest-model';
import { validateSession } from '../../../helper/validate-session';
import { UserModel } from '../../../modules/users/user-model';

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
    
		await dbConnect();
		const quest = await QuestModel.findById(request.questId);
		if(quest) {
			const index = quest.subscriber.findIndex(c => c._id == request.subscriberId );
			if(index === -1) {
				throw new Error();
			}

    	quest.subscriber.splice(index, 1);
    	await quest.save();

			const user = await UserModel.findById(session.id);
			if(user) {
				const index = user.subscribedQuests.findIndex(x => x.questId === request.questId);
				if(index !== -1) {
					user.subscribedQuests.splice(index, 1);
					user.save();
				}
			}
		}
		res.status(200).send('');
	} catch (error) {
		res.status(500).send('');
	}
};

export default handler;