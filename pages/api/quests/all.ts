import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const data = await mongoDbHelper.getAll('quests');
	res.status(200).json(data);
};

export default handler;