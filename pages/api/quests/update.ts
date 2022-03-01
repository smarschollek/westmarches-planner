import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { object, string } from 'yup';
import { apiProtector } from '../../../helper/api-protector';
import { dbConnect } from '../../../helper/db-connect';
import { QuestModel } from '../../../models/quest-model';

interface UpdateQuestRequest {
	_id: string
	name: string
	placeId: string
	imageGuid: string
	state: string,
	description: string
}

const validationSchema = object({
	_id: string().required(),
	name: string().required(),
	placeId: string().required()
});

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const protectedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {	
		await validationSchema.validate(req.body);

		const body = req.body as UpdateQuestRequest;

		dbConnect();
		
		const quest = await QuestModel.findById(body._id);
		if(quest) {
			quest.name = body.name;
			quest.description = body.description;
			quest.questState = body.state;
			quest.placeId = body.placeId;
			quest.imageGuid = body.imageGuid;
			await quest.save();
		}
		res.status(200).json('');
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;