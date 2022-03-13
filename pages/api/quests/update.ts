import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { questService } from '../../../modules/quests/quest-service';

interface UpdateQuestRequest {
	_id: string
	name: string
	placeId: string
	imageGuid: string
	questState: string,
	description: string
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	placeId: string().required(),
	imageGuid: string(),
	questState: string().required(),
	description: string()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);
		questService.update({...req.body as UpdateQuestRequest});
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;