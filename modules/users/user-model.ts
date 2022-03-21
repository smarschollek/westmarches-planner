import mongoose from 'mongoose';
import { ObjectId } from 'mongoose/node_modules/mongodb';
import { User } from './user-types';

const userSchema = new mongoose.Schema<User>({
	_id: ObjectId,
	name: String,
	email: String,
	isAdmin: Boolean,
	isGamemaster: Boolean,
	characters: [
		{
			name: String,
			level: Number,
			class: String,
			description: String
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