import mongoose from 'mongoose';
import { Quest } from './quest-types';

const questSchema = new mongoose.Schema<Quest>({
	creator: String,
	name: String,
	description: String,
	questState: String,
	placeId: String,
	imageGuid: String,
	subscriber: [
		{
			username: String,
			character : {
				name: String,
				class: String,
				level: Number,
			},
			times: [{
				day: String,
				hours: [Number]
			}]
		}
	]
});

export const QuestModel = mongoose.models.Quest as mongoose.Model<Quest, {}, {}, {}> || mongoose.model<Quest>('Quest', questSchema);