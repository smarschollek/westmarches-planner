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

interface UnsubscribeCommand {
	questId: string,
	subscriberId: string
}

interface UpdateTimesCommand {
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
	unsubscribe: (command: UnsubscribeCommand) => Promise<void>
	updateTimes: (command: UpdateTimesCommand) => Promise<void>

    getById: (id: string) => Promise<Quest | null>
    getAll: () => Promise<Quest[]>
	getByPlaceId: (placeId: string) => Promise<Quest[]>
}

const create = async (command: CreateQuestCommand) : Promise<void> => {
	await dbConnect();
	await QuestModel.create({
		questState: 'Open',
		creator: command.creator,
		description: command.description,
		imageGuid: command.imageGuid,
		name: command.name,
		placeId: command.placeId
	});
};

const update = async (command: UpdateQuestCommand) : Promise<void> => {
	await dbConnect();
	QuestModel.updateOne({'_id': command._id}, {
		questState: command.questState,
		description: command.description,
		imageGuid: command.imageGuid,
		name: command.name,
		placeId: command.placeId
	});
};

const _delete = async (command: DeleteQuestCommand) : Promise<void> => {
	await dbConnect();
	QuestModel.deleteOne({'_id': command._id});
};

const getById = async (id: string) : Promise<Quest | null> => {
	await dbConnect();
	return QuestModel.findById<Quest>(id).exec();
};

const getAll = async () : Promise<Quest[]> => {
	await dbConnect();
	return QuestModel.find<Quest>({}).exec();
};

const getByPlaceId = async (placeId: string) : Promise<Quest[]> => {
	await dbConnect();
	return QuestModel.where<Quest>('placeId').equals(placeId).exec();	
};

const subscribe = async (command: SubscribeCommand) : Promise<void> => {
	await dbConnect();
	const quest = await QuestModel.findById(command.questId);
	if(quest) {
		quest.subscriber.push(command);
		await quest.save();
	}	
};

const unsubscribe = async (command: UnsubscribeCommand) : Promise<void> => {
	await dbConnect();
	const quest = await QuestModel.findById(command.questId);
	if(quest) {
		const index = quest.subscriber.findIndex(x => x._id?.toString() === command.subscriberId);
		if(index !== -1) {
			quest.subscriber.splice(index, 1);
			await quest.save();
		}
	}	
};

const updateTimes = async(command: UpdateTimesCommand) : Promise<void> => {
	await dbConnect();
	const quest = await QuestModel.findById(command.questId);
	if(quest) {
		const index = quest.subscriber.findIndex(x => x.username === command.username);
		quest.subscriber[index] = command;
		await quest.save();
	}	
};

export const questService : QuestService = {
	create,
	update,
	delete: _delete,
	getById,
	getAll,
	getByPlaceId,
	subscribe,
	unsubscribe,
	updateTimes
};