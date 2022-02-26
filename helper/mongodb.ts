import { Document, MongoClient, ObjectId, WithId } from 'mongodb';

export type CollectionNames = 'quests' | 'sessions' | 'places'

type OptionalId = {
    _id?: string
}

const add = async <T>(collectionName: CollectionNames, document: T) : Promise<void> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}
    
	const client = await MongoClient.connect(uri);
	const db = client.db(database);
	await db.collection(collectionName).insertOne(document);
	client.close();    
};

const update = async <T extends OptionalId>(collectionName: CollectionNames, id: string, document: T) : Promise<void> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}
    
	delete document._id;

	const client = await MongoClient.connect(uri);
	const db = client.db(database);
	await db.collection(collectionName).updateOne({'_id' : new ObjectId(id)}, {'$set' : document});
	client.close();    
};

const _delete = async (collectionName: CollectionNames, id: string) : Promise<void> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}
    
	const client = await MongoClient.connect(uri);
	const db = client.db(database);
	await db.collection(collectionName).deleteOne({'_id' : new ObjectId(id)});
	client.close(); 
};

const getAll = async <T>(collectionName: CollectionNames) : Promise<WithId<T>[]> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}
    
	const client = await MongoClient.connect(uri);
	const db = client.db(database);
	const data = await db.collection<T>(collectionName).find({}).toArray();
	client.close(); 

	return data;
};

const get = async <T>(collectionName: CollectionNames, id: string) : Promise<WithId<T>> => {
	const uri = process.env.MONGODB_URI;
	const database = process.env.MONGODB_DB;

	if(!uri) {
		throw new Error('process.env.MONGODB_URI is not set');
	}

	if(!database) {
		throw new Error('process.env.MONGODB_DB is not set');
	}
    
	const client = await MongoClient.connect(uri);
	const db = client.db(database);
	const data = (await db.collection(collectionName).findOne({'_id' : new ObjectId(id)}) as WithId<T>);
	client.close(); 

	if(!data) {
		throw new Error('no data found');
	}

	return data;
};


export interface MongoDbHelper {
    add<T>(collectionName: CollectionNames, document: T) : Promise<void>
    update<T>(collectionName: CollectionNames, id: string, document: T) : Promise<void>
    delete(collectionName: CollectionNames, id: string) : Promise<void>
    getAll<T>(collectionName: CollectionNames) : Promise<WithId<T>[]>
    get<T>(collectionName: CollectionNames, id: string) : Promise<WithId<T>>
}

export const mongoDbHelper : MongoDbHelper = {
	add,
	update,
	delete: _delete,
	getAll,
	get
};