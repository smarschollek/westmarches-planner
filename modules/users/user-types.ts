export interface User {
	_id: string;
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
	_id?: string,
	name: string,
	level: number,
	class: string,
	description: string
}

export interface FavoritPlace {
	_id?: string,
	placeId: string,
	name: string
}

export interface SubscribedQuest {
	_id?: string,
	questId: string,
	name: string
}