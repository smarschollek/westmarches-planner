import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { Quest, QuestModel } from '../../../models/quest-model';
import {Document} from 'mongoose';

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
		schema.validate(req.body);
		const request = req.body as UnsubscribeQuestRequest;
    
		dbConnect();
		const quest : Quest | null = await QuestModel.findById<Quest & Document>(request.questId);
		if(quest) {
			const index = quest.subscriber.findIndex(c => c._id == request.subscriberId );
			if(index === -1) {
				throw new Error();
			}

    	quest.subscriber.splice(index, 1);
    	await quest.save();
		}
    
		res.status(200).send('');
	} catch (error) {
		res.status(500).send('');
	}
};

export default handler;