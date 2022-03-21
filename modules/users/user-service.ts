import { authHelper } from '../../helper/auth';
import { dbConnect } from '../../helper/db-connect';
import { Place } from '../places/place-types';
import { UserModel } from './user-model';
import { Character, SubscribedQuest, User } from './user-types';

interface CreateUserCommand {
	name: string,
	email: string
}

interface UserService {
	create: (command: CreateUserCommand) => Promise<void>
    getByEmail(email: string) : Promise<User | undefined>
	toggleFavoritPlace: ( email: string, place: Place) => Promise<void>
	addSubscribedQuests: (email: string, quest: SubscribedQuest) => Promise<void>
	deleteSubscribedQuests: (email: string, questId: string) => Promise<void>
	addCharacter: (email: string, character: Character) => Promise<void>
}

const register = async (command: CreateUserCommand) : Promise<void> => {
	await dbConnect();
	await UserModel.create({
		...command,
		isAdmin: false,
		isGamemaster: false
	});
};

const getByEmail = async (email: string) : Promise<User | undefined> => {
	await dbConnect();
	const user = await UserModel.findOne({'email': email});
	if(!user) {
		return undefined;
	}
	return user;
};

const toggleFavoritPlace = async (email: string, place: Place) => {
	await dbConnect();
	const user = await UserModel.findOne({'email': email});
	if(user) {
		const index = user.favoritPlaces.findIndex(x=>x.placeId == place._id.toString());
		if(index !== -1) {
			user.favoritPlaces.splice(index,1);
		} else {
			user.favoritPlaces.push({
				placeId: place._id.toString(),
				name: place.name
			});
		}
		await user.save();
	}
};

const addSubscribedQuests = async (email: string, quest: SubscribedQuest) : Promise<void> => {
	await dbConnect();
	const user = await UserModel.findOne({'email': email});
	if(user) {
		user.subscribedQuests.push(quest);
		await user.save();
	}
};

const deleteSubscribedQuests = async (email: string, questId: string) => {
	await dbConnect();
	const user = await UserModel.findOne({'email': email});
	if(user) {
		const index = user.subscribedQuests.findIndex(x => x.questId === questId);
		if(index !== -1) {
			user.subscribedQuests.splice(index, 1);
			await user.save();
		}
	}
};

const addCharacter = async (email: string, character: Character) : Promise<void> => {
	await dbConnect();
	const user = await UserModel.findOne({'email': email});
	if(user) {
		user.characters.push(character);
		user.save();
	}
};

export const userService : UserService = {
	create: register,
	getByEmail,
	toggleFavoritPlace,
	addSubscribedQuests,
	deleteSubscribedQuests,
	addCharacter
};