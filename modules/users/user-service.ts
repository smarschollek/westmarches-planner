import { authHelper } from '../../helper/auth';
import { dbConnect } from '../../helper/db-connect';
import { Place } from '../places/place-types';
import { UserModel } from './user-model';
import { User } from './user-types';

interface RegisterUserCommand {
	name: string,
	email: string,
	password: string
}

interface UserService {
	register: (command: RegisterUserCommand) => Promise<void>
    getByEmail(email: string) : Promise<User | undefined>
	toggleFavoritPlace: ( userId: string, place: Place) => Promise<void>
}

const register = async (command: RegisterUserCommand) : Promise<void> => {
	const hashedPassword = await authHelper.hashPassword(command.password);
	await dbConnect();
	await UserModel.create({
		...command,
		password: hashedPassword,
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

const toggleFavoritPlace = async (userId: string, place: Place) => {
	await dbConnect();
	const user = await UserModel.findById(userId);
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

export const userService : UserService = {
	register,
	getByEmail,
	toggleFavoritPlace
};