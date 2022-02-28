import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../helper/db-connect';
import { apiProtector } from '../../../helper/api-protector';
import { Quest, QuestModel } from '../../../models/quest-model';

export interface AddQuestRequest {
	name: string,
	description?: string
	placeId: string
	imageGuid: string
	creatorId: string
}

const validationSchema = object({
	name: string().required(),
	placeId: string().required(),
	creatorId: string().required(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		
		const body = req.body as AddQuestRequest;

		dbConnect();
		
		QuestModel.create({
			questState: 'Planning',
			name: body.name,
			description: body.description ?? '',
			placeId: body.placeId,
			imageGuid: body.imageGuid,
			creatorId: body.creatorId,
		});
	
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;