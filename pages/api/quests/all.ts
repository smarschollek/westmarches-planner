import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { Quest } from '../../../types/dtos';

type Response = {
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
	const {client, database} = await mongoDbHelper.connect();
	const collection = database.collection('quests');
	const data = await collection.find<Quest>({}).toArray();
	res.status(200).json(data);
	client.close();
};

export default handler;