import { dbConnect } from '../../helper/db-connect';
import { DayAndTime } from '../common/common-types';
import { QuestModel } from './quest-model';
import { Quest } from './quest-types';

interface CreateQuestCommand {
    name: string,
	description: string
	placeId: string
	imageGuid: string,
    creator: string
}

interface UpdateQuestCommand {
    _id: string
    name: string
	placeId: string
	imageGuid: string
	questState: string,
	description: string
}

interface DeleteQuestCommand {
    _id: string
}

interface SubscribeCommand {
	questId: string,
	username: string,
	character: {
		name: string,
		class: string,
		level: number
	}
	times: DayAndTime[]
}

interface QuestService {
    create: (command: CreateQuestCommand) => Promise<void>
    update: (command: UpdateQuestCommand) => Promise<void>
    delete: (command: DeleteQuestCommand) => Promise<void>

	subscribe: (command: SubscribeCommand) => Promise<void>

    getById: (id: string) => Promise<Quest | null>
    getAll: () => Promise<Quest[]>
	getByPlaceId: (placeId: string) => Promise<Quest[]>
}

const create = async (command: CreateQuestCommand) : Promise<void> => {
	await dbConnect();
	await QuestModel.create({
		questState: 'Planning',
		creator: command.creator,
		description: command.description,
		imageGuid: command.imageGuid,
		name: command.name,
		placeId: command.placeId
	});
};

const update = async (command: UpdateQuestCommand) : Promise<void> => {
	await dbConnect();
	await QuestModel.updateOne({'_id': command._id}, {
		questState: command.questState,
		description: command.description,
		imageGuid: command.imageGuid,
		name: command.name,
		placeId: command.placeId
	});
};

const _delete = async (command: DeleteQuestCommand) : Promise<void> => {
	await dbConnect();
	await QuestModel.deleteOne({'_id': command._id});
};

const getById = async (id: string) : Promise<Quest | null> => {
	await dbConnect();
	return await QuestModel.findById(id);
};

const getAll = async () : Promise<Quest[]> => {
	await dbConnect();
	return await QuestModel.find({});
};

const getByPlaceId = async (placeId: string) : Promise<Quest[]> => {
	await dbConnect();
	return await QuestModel.where('placeId').equals(placeId);	
};

const subscribe = async (command: SubscribeCommand) : Promise<void> => {
	await dbConnect();
	const quest = await QuestModel.findById(command.questId);
	if(quest) {
		quest.subscriber.push({
			username: command.username,
			character: command.character,
			times: command.times
		});
		quest.save();
	}	
};

export const questService : QuestService = {
	create,
	update,
	delete: _delete,
	getById,
	getAll,
	getByPlaceId,
	subscribe
};