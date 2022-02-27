import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { mongoDbHelper } from '../../../helper/mongodb';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const {client, database} = await mongoDbHelper.connect();
	const collection = database.collection('quests');
	const data = await collection.find({'questState' : 'Open'}).toArray();
	await client.close();
	res.status(200).json(data);
};

export default handler;