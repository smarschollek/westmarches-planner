import { dbConnect } from '../../helper/db-connect';
import { GameSessionModel } from './session-model';
import { GameSession } from './session-types';

interface SessionService {
    create : (session: GameSession) => Promise<void>
    update : (id: string, session: GameSession) => Promise<void>
    delete : (id: string) => Promise<void>

	getSubscribedSessions: (username : string) => Promise<GameSession[]>
	getById: (id: string) => Promise<GameSession | null>
}

const create = async (session: GameSession) : Promise<void> => {
	await dbConnect();
	await GameSessionModel.create(session);
};

const update = async (id: string, session: GameSession) : Promise<void> => {
	await dbConnect();
	await GameSessionModel.updateOne({'_id' : id}, session);
};

const _delete = async (id: string) : Promise<void> => {
	await dbConnect();
	await GameSessionModel.deleteOne({'_id' : id});
};

const getSubscribedSessions = async (username : string) : Promise<GameSession[]> => {
	await dbConnect();
	return await GameSessionModel.where('player').elemMatch({name: username}).exec();
};

const getById = async (id: string) : Promise<GameSession | null> => {
	await dbConnect();
	return await GameSessionModel.findById(id).exec();
};

export const sessionService : SessionService = {
	create,
	update,
	delete: _delete,
	getSubscribedSessions,
	getById
};