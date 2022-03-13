import mongoose from 'mongoose';
import { GameSession } from './session-types';


const sessionSchema = new mongoose.Schema<GameSession>({
	creator: String,
	questId: String,
	questName: String,
	date: {
		day: String,
    	hours: [Number]
	},
	players: [{
		name: String,
		character : {
			name: String,
			class: String,
			level: Number
		}
	}]
});



export const GameSessionModel = mongoose.models.GameSession as mongoose.Model<GameSession, {}, {}, {}> || mongoose.model<GameSession>('GameSession', sessionSchema);