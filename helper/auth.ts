import {hash, compare} from 'bcryptjs';

export interface AuthHelper {
    hashPassword: (password: string) =>  Promise<string>;
	verifyPassword: (password: string, hashedPassword: string)  => Promise<boolean>
}

const hashPassword = async (password: string) : Promise<string> => {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
};
 
const verifyPassword = async (password: string, hashedPassword: string) : Promise<boolean> => {
	return await compare(password, hashedPassword);
};


export const authHelper : AuthHelper = {
	hashPassword,
	verifyPassword
};