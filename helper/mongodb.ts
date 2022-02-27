import { Db, MongoClient } from 'mongodb';

export type CollectionNames = 'quests' | 'sessions' | 'places' | 'users'

const connect = async () : Promise<{ client: MongoClient, database : Db }> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}

	const client = await MongoClient.connect(uri);
	
	return {
		client,
		database: client.db(database)
	};
};

export interface MongoDbHelper {
    connect() : Promise<{ client: MongoClient, database : Db }>
}

export const mongoDbHelper : MongoDbHelper = {
	connect
};