import mongoose from 'mongoose';

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

const userSchema = new mongoose.Schema<User>({
	name: String,
	email: String,
	password: String,
	isAdmin: Boolean,
	isGamemaster: Boolean,
	characters: [
		{
			name: String,
			level: Number,
			class: String,
			comment: String
		}
	],
	subscribedQuests: [{
		questId: String,
		name: String
	}],
	favoritPlaces: [{
		placeId: String,
		name: String
	}]
});

export const UserModel = mongoose.models.User as mongoose.Model<User, {}, {}, {}> || mongoose.model<User>('User', userSchema);