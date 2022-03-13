import mongoose from 'mongoose';
import { GameSession } from './session-types';


const sessionSchema = new mongoose.Schema<GameSession>({
	creator: String,
	date: Date,
	players: [{
		name: String,
		character : {
			name: String,
			class: String,
			level: Number
		}
	}]
});



export const GameSessionModel = mongoose.models.Session as mongoose.Model<GameSession, {}, {}, {}> || mongoose.model<GameSession>('GameSession', sessionSchema);