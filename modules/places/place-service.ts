import { dbConnect } from '../../helper/db-connect';
import { PlaceModel } from './place-model';
import { Place } from './place-types';

interface CreatePlaceCommand {
    name: string,
    description: string,
    imageGuid: string
}

interface UpdatePlaceCommand {
    _id: string
    name: string,
    description: string,
    imageGuid: string
}

interface DeletePlaceCommand {
    _id: string
}

interface PlaceService {
    create: (command : CreatePlaceCommand) => Promise<void>
    update: (command : UpdatePlaceCommand) => Promise<void>
    delete: (command : DeletePlaceCommand) => Promise<void>

    getById: (id: string) => Promise<Place | null>
	getAll: () => Promise<Place[]>
}

const create = async (command : CreatePlaceCommand) : Promise<void> => {
	await dbConnect();    
	await PlaceModel.create(command);
};

const update = async (command : UpdatePlaceCommand) : Promise<void> => {
	const {_id: id, ...rest} = command;
	await dbConnect();    
	await PlaceModel.updateOne({'_id' : id}, rest);
};

const _delete = async (command : DeletePlaceCommand) : Promise<void> => {
	await dbConnect();
	await PlaceModel.deleteOne({'_id' : command._id});
};

const getById = async (id: string) : Promise<Place | null> => {
	await dbConnect();
	return await PlaceModel.findById<Place>(id).exec();
};

const getAll = async () : Promise<Place[]> => {
	await dbConnect();
	return await PlaceModel.find<Place>({}).exec();
};

export const placeService : PlaceService = {
	create,
	update,
	delete: _delete,
	getById,
	getAll
};