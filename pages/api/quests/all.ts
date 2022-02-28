import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { Quest, QuestModel } from '../../../models/quest-model';

type AllQuestsResponse = Quest[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<AllQuestsResponse>) => {
	dbConnect();
	const data = await QuestModel.find<Quest>({});
	
	const result : AllQuestsResponse = [];

	data.forEach(x => {
		result.push(JSON.parse(JSON.stringify(x)));
	});

	res.status(200).json(result);
};

export default handler;