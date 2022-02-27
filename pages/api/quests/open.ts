import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const data = await mongoDbHelper.query<Quest>('quests', {'questState' : 'Open'});
	res.status(200).json(data);
};

export default handler;