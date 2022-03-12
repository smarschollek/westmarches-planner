import mongoose, {Document} from 'mongoose';

export interface Quest {
	_id: string;
	creator: string,
    name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: string
    subscriber: Subscriber[]
}

export interface Subscriber {
	_id?: string;
	name: string,
    characterName: string,
    characterClass: string,
    characterLevel: number
	times: {[key: string] : number[]}
}

const questSchema = new mongoose.Schema<Quest>({
	creator: String,
	name: String,
	description: String,
	questState: String,
	placeId: String,
	imageGuid: String,
	subscriber: [
		{
			name: String,
			characterName: String,
			characterClass: String,
			characterLevel: Number,
			times: [Object]
		}
	]
});

export const QuestModel = mongoose.models.Quest as mongoose.Model<Quest, {}, {}, {}> || mongoose.model<Quest>('Quest', questSchema);