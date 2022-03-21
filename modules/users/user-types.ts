import { ObjectId } from 'mongoose/node_modules/mongodb';

export interface User {
	_id: ObjectId;
	name: string,
	email: string,
	password: string,
	isAdmin: boolean,
	isGamemaster: boolean,
	characters: Character[]
	subscribedQuests: SubscribedQuest[]
	favoritPlaces: FavoritPlace[]
}

export interface Character {
	_id?: ObjectId,
	name: string,
	level: number,
	class: string,
	description: string
}

export interface FavoritPlace {
	_id?: ObjectId,
	placeId: string,
	name: string
}

export interface SubscribedQuest {
	_id?: ObjectId,
	questId: string,
	name: string
}