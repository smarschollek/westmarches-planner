import mongoose from 'mongoose';

export interface Quest {
    name: string,
    description: string,
    state: string,
    placeId: string,
    subscriber: Subscriber[]
}

export interface Subscriber {
    name: string,
    characterName: string,
    characterClass: string,
    characterLevel: number
}

const questSchema = new mongoose.Schema<Quest>({
	name: String,
	description: String,
	state: String,
	placeId: String,
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