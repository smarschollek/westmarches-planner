import type { NextApiRequest, NextApiResponse } from 'next';
import { validateSession } from '../../../helper/validate-session';
import { DayAndTime } from '../../../modules/common/common-types';
import { sessionService } from '../../../modules/sessions/session-service';

export interface MySessionsResponse {
    sessions : SessionInfo[]
}

export interface SessionInfo {
    questName: string,
    questId: string 
    date: DayAndTime
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await validateSession(req);
		if(!session || !session.user) {
			throw new Error('session error');
		}

		const query = await sessionService.getSubscribedSessions(session.user.name!);
		
		const sessions : SessionInfo[] = [];
		for(const item of query) {
			sessions.push({
				questId: item.questId,
				questName: item.questName,
				date: item.date
			});
		}
		
		const response : MySessionsResponse = {
			sessions      
		};

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;