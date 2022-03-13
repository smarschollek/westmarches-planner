import { DayAndTime } from '../common/common-types';

export type QuestStates = 'Open' | 'Closed'

export interface Quest {
	_id: string;
	creator: string,
    name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: QuestStates
    subscriber: Subscriber[]
}

export interface Subscriber {
	_id?: string;
	username: string,
	character : {
		name: string,
    	class: string,
    	level: number
	},    
	times: DayAndTime[]
}