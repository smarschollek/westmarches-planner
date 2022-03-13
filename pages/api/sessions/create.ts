import type { NextApiRequest, NextApiResponse } from 'next';
import { array, number, object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { DayAndTime, PlayerInfo } from '../../../modules/common/common-types';
import { questService } from '../../../modules/quests/quest-service';
import { GameSessionModel } from '../../../modules/sessions/session-model';
import { sessionService } from '../../../modules/sessions/session-service';
import { GameSession } from '../../../modules/sessions/session-types';
export interface CreateSessionRequest {
    date: DayAndTime,
    creator: string,
	questName: string,
    questId: string
    players: PlayerInfo[]
}

const schema = object({
	date: object({
		day: string(),
		hours: array()
	}),
	creator: string(),
	questName: string(),
	questId: string(),
	players: array().of(
		object({
			name: string(),
			character: object({
				name: string(),
				class: string(),
				level: number()
			})
		})
	)
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await schema.validate(req.body);
		const request = req.body as CreateSessionRequest;
		await sessionService.create(request);

		const quest = await questService.getById(request.questId);
		if(quest) {
			quest.questState = 'Closed';
			await questService.update(quest);
		}

		res.status(200).json('');
	} catch (error) {
		res.status(200).json(error);
	}
};

export default handler;