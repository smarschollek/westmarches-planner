import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import {array, object, string} from 'yup';
import { getSession } from 'next-auth/react';
import { DayAndTime } from '../../../modules/common/common-types';
import { questService } from '../../../modules/quests/quest-service';
import { userService } from '../../../modules/users/user-service';
import { Character } from '../../../modules/users/user-types';

type EditTimesRequest = {
	characterId: string
	questId: string
	times: DayAndTime[]
}

const schema = object({
	characterId: string().required(),
	questId:  string().required(),
	times: array().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSession({req});
		if(!session || !session.user) {
			throw new Error('session is not valid');
		}

		await schema.validate(req.body);
		const request = req.body as EditTimesRequest;
		const user = await userService.getByEmail(session.user.email!);
		const quest = await questService.getById(request.questId);
		if(user && quest) {
			const character	= user.characters.find((x: Character) => x._id?.toString() == request.characterId);
			if(character) {
				await questService.updateTimes({
					character,
					username: user.name,
					questId: request.questId,
					times: request.times
				});
			}
		}

		res.status(200).send('');
		
	} catch (error: any) {
		res.status(500).send({message: error.message});
	}
};

export default handler;