import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../helper/db-connect';
import { apiProtector } from '../../../helper/api-protector';
import { QuestModel } from '../../../models/quest-model';

interface AddQuestRequest {
	name: string,
	description?: string
	placeId: string
}

const validationSchema = object({
	name: string().required(),
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const body = req.body as AddQuestRequest;

		dbConnect();
		
		QuestModel.create({
			state: 'Planning',
			name: body.name,
			description: body.description ?? '',
			placeId: body.placeId
		});
	
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;