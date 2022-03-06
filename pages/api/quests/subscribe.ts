import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../helper/db-connect';
import { apiProtector } from '../../../helper/api-protector';
import { object, string } from 'yup';
import { getSession } from 'next-auth/react';
import { UserModel } from '../../../models/user-model';
import { QuestModel } from '../../../models/quest-model';

type SubscribeRequest = {
	characterId: string
	questId: string
	times: {[key: string] : string[]}
}

const schema = object({
	characterId: string().required(),
	questId:  string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSession({req});
	
		if(!session || !session.user) {
			throw new Error('session is not valid');
		}

		await schema.validate(req.body);
		const request = req.body as SubscribeRequest;

		dbConnect();
		const user = await UserModel.findOne({'email' : session.user.email});
		if(user) {
			const character = user.characters.find((x: any)=>x.id === request.characterId);

			if(character) {
				const quest = await QuestModel.findById(request.questId);
				if(quest) {
					user.subscribedQuests.push({
						questId: quest._id,
						name: quest.name
					});
					await user.save();

					quest.subscriber.push({
						
						name: user.name,
						characterClass: character.class,
						characterLevel: character.level,
						characterName: character.name,
						times: request.times
					});	
					await quest.save();
				}
			}
		}
		res.status(200).send('');
		
	} catch (error: any) {
		res.status(500).send({message: error.message});
	}
};

export default handler;