import { object, string } from 'yup';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiProtector } from '../../../helper/api-protector';
import { validateSession } from '../../../helper/validate-session';
import { questService } from '../../../modules/quests/quest-service';

export interface AddQuestRequest {
	name: string,
	description: string
	placeId: string
	imageGuid: string
}

const validationSchema = object({
	name: string().required(),
	placeId: string().required(),
	description: string(),
	imageGuid: string()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {		
		const session = await validateSession(req);
		const creator = session.user?.name;
		if(!creator) {
			throw new Error('session broken');
		}
		
		await validationSchema.validate(req.body);

		questService.create({
			...req.body as AddQuestRequest,
			creator,
		});

		res.status(200).json('');
	} catch (error) {
		res.status(500).json(JSON.stringify(error));
	}
};

export default handler;