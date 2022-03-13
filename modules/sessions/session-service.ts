import { dbConnect } from '../../helper/db-connect';
import { GameSessionModel } from './session-model';
import { GameSession } from './session-types';

interface SessionService {
    create : (session: GameSession) => Promise<void>
    update : (id: string, session: GameSession) => Promise<void>
    delete : (id: string) => Promise<void>
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


export const sessionService : SessionService = {
	create,
	update,
	delete: _delete
};