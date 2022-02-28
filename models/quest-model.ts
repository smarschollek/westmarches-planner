import mongoose from 'mongoose';

export interface Quest {
	_id: string,
	creatorId: string,
    name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: string
    subscriber: Subscriber[]
}

export interface Subscriber {
    name: string,
    characterName: string,
    characterClass: string,
    characterLevel: number
}

const questSchema = new mongoose.Schema<Quest>({
	creatorId: String,
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
			characterLevel: Number
		}
	]
});

export const QuestModel = mongoose.models.Quest || mongoose.model<Quest>('Quest', questSchema);