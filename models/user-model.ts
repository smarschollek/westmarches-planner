import mongoose from 'mongoose';

export interface User {
	_id: string;
	name: string,
	email: string,
	password: string,
	isAdmin: boolean,
	isGamemaster: boolean,
	characters: Character[]
	subscribedQuests: string[]
	favoritPlaces: string[]
}

export interface Character {
	_id?: string,
	name: string,
	level: number,
	class: string,
	description: string
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
	subscribedQuests: [String],
	favoritPlaces: [String]
});

export const UserModel = mongoose.models.User as mongoose.Model<User, {}, {}, {}> || mongoose.model<User>('User', userSchema);