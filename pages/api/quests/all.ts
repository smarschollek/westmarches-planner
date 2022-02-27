import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const {client, database} = await mongoDbHelper.connect();
	const collection = database.collection('quests');
	const data = await collection.find<Quest>({}).toArray();
	await client.close();
	res.status(200).json(data);
};

export default handler;