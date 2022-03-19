import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { DayAndTime, PlayerInfo } from '../../../modules/common/common-types';
import { questService } from '../../../modules/quests/quest-service';
import { sessionService } from '../../../modules/sessions/session-service';

interface GetSessionDetailsResponse {
    gamemaster: string,
    date: DayAndTime,
    quest: {
        name: string,
        description: string
    },
    players: PlayerInfo[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let {id} = req.query;
		if(Array.isArray(id)) {
			throw new Error('multiple ids found');
		}

		const gameSession = await sessionService.getById(id);
		if(!gameSession) {
			throw new Error('no gamesession found');
		}

		const quest = await questService.getById(gameSession.questId);
		if(!quest) {
			throw new Error('no quest found');
		}

		const result : GetSessionDetailsResponse = {
			gamemaster: quest.creator,
			date: gameSession.date,
			quest: {
				name: quest.name,
				description: quest.description
			},
			players: gameSession.players
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;