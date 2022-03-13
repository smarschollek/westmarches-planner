import { ObjectId } from 'mongodb';
import NextAuth, { Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { object, string } from 'yup';
import { authHelper } from '../../../helper/auth';
import { userService } from '../../../modules/users/user-service';

type AuthUser = {
    name: string
	email: string,
	isGamemaster: boolean,
	isAdmin: boolean
}

const authorizeSchema = object({
	email: string().email().required(),
	password: string().required()
});

export default NextAuth({
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async session({ session , token, user }) {
			if(session.user && session.user.email) {
				const storeUser = await userService.getByEmail(session.user.email);
				if(storeUser) {
					session.isAdmin = storeUser.isAdmin;
					session.isGamemaster = storeUser.isGamemaster;
					session.id = storeUser._id;
				}
			}
			
			return session;
		}
	},
	providers: [
		Credentials({
			authorize: async (credentials): Promise<AuthUser> => {
				try {
					if(credentials) {
						await authorizeSchema.validate(credentials);
						const user = await userService.getByEmail(credentials.email);
						if(!user) {
							throw new Error('login failed');
						}
	
						const isValid =  await authHelper.verifyPassword(credentials.password, user.password);
						if(!isValid) {
							throw new Error('login failed');
						}
	
						return {
							name: user.name,
							email: user.email,
							isAdmin: user.isAdmin,
							isGamemaster: user.isGamemaster
						};
					}
					
					throw new Error('bad request');
				} catch (error : any) {
					console.log(error);
					throw new error;
				}
			},
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: {  label: 'Password', type: 'password' }
			}
		})
	]
});