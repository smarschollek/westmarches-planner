import { ObjectId } from 'mongodb';
import { DayAndTime } from '../common/common-types';

export type QuestStates = 'Open' | 'Closed'

export interface Quest {
	_id: ObjectId;
	creator: string,
    name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: QuestStates
    subscriber: Subscriber[]
}

export interface Subscriber {
	_id?: ObjectId;
	username: string,
	character : {
		_id?: ObjectId;
		name: string,
    	class: string,
    	level: number
	},    
	times: DayAndTime[]
}