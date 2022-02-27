import type { NextApiRequest, NextApiResponse } from 'next';
import { mongoDbHelper } from '../../../helper/mongodb';
import { apiProtector } from '../../../helper/api-protector';
import { object, string } from 'yup';
import { getSession } from 'next-auth/react';
import { User } from '../../../types/models';
import { ObjectId } from 'mongodb';

type SubscribeRequest = {
	characterId: string
	questId: string
}

const schema = object({
	characterId: string().required(),
	questId:  string().required(),
});

// const handler = (req: NextApiRequest, res: NextApiResponse<Response>) => apiProtector(req, res, protectedHandler);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const session = await getSession({req});
	
		if(!session || !session.user) {
			throw new Error('session is not valid');
		}

		const {client, database} = await mongoDbHelper.connect();
		const questCollection = database.collection('quests');
		const userCollection = database.collection('users');

		await schema.validate(req.body);
		const request : SubscribeRequest = req.body;


		const user = await userCollection.findOne<User>({'email' : session.user.email});
		if(user) {
			//character aus user holen
			await userCollection.updateOne({'_id' : user._id}, { $push: {'subscribesQuests' : new ObjectId(request.questId)} });
			await questCollection.updateOne({'_id' : new ObjectId(request.questId) }, { $push:{'subscribers': { user: user.name, character: 'Test' } } });
		}
		await client.close();
		res.status(200).send('');
		
	} catch (error: any) {
		res.status(500).send({message: error.message});
	}
};

export default handler;