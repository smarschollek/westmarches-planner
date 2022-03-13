import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { DayAndTime, PlayerInfo } from '../../../modules/common/common-types';
import { questService } from '../../../modules/quests/quest-service';
import { timeCondenser } from '../../../modules/sessions/helper/time-condenser';

export interface SessionInfoResponse {
    questName: string,
    questId: string,
	players : PlayerInfo[]
	times: DayAndTime[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		let {id} = req.query;
		if(!id) {
			throw new Error('id is not set');
		}

		if(Array.isArray(id)) {
			id = id[0];
		}

		const quest = await questService.getById(id);
		if(!quest) {
			throw new Error('quest not found');
		}

		const player = quest.subscriber.map<PlayerInfo>(x => ({
			name: x.username,
			character: x.character
		}));
			

		const times = quest.subscriber.map<DayAndTime[]>(x => (x.times));
		const condensedByDay = await timeCondenser.days(times);
		const condensedByHours = await timeCondenser.hours(condensedByDay);
		
		const result : SessionInfoResponse = {
			questId: quest._id,
			questName: quest.name,
			players: player,
			times: condensedByHours.map(x => ({day: x.day, hours: x.hours}))
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;