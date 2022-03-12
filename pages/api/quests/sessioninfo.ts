import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { QuestModel } from '../../../models/quest-model';

export interface SessionInfoResponse {
    sessionInfos: SessionInfo[]
}

export interface SessionInfo {
    name: string,
    times: {[key:string]: number[]}
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {id} = req.query;
		if(!id) {
			throw new Error('id is not set');
		}

		const quest = await QuestModel.findById(id);
		if(!quest) {
			throw new Error('quest not found');
		}

		const sessionInfos = quest.subscriber.map<SessionInfo>(x => ({
			name: x.name,
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