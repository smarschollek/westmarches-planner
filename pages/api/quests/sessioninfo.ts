import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { DayAndTime } from '../../../modules/common/common-types';
import { QuestModel } from '../../../modules/quests/quest-model';
import { questService } from '../../../modules/quests/quest-service';

export interface SessionInfoResponse {
    sessionInfos: SessionInfo[]
}

export interface SessionInfo {
    name: string,
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

		const sessionInfos = quest.subscriber.map<SessionInfo>(x => ({
			name: x.username,
			times: x.times
		}));

		const result : SessionInfoResponse = {
			sessionInfos
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;