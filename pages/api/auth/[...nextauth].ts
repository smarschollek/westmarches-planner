import NextAuth, {  IncomingRequest } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { object, string } from 'yup';
import { authHelper } from '../../../helper/auth';
import { mongoDbHelper } from '../../../helper/mongodb';

type User = {
    name: string
	password: string
    email: string
	isGamemaster: boolean
	isAdmin: boolean
	
}

type AuthUser = {
    name: string
	email: string,
	isGamemaster: boolean,
	isAdmin: boolean,
	test: string
}

const authorizeSchema = object({
	email: string().email().required(),
	password: string().required()
});

export default NextAuth({
	secret: process.env.AUTH_SECRET,
	callbacks: {
		async session({ session, token, user }) {
			if(session.user && session.user.email) {
				const {client, database} = await mongoDbHelper.connect();
				const collection = database.collection('users');
				const storeUser = await collection.findOne<User>({'email' : session.user.email});

				if(storeUser) {
					session.isAdmin = storeUser.isAdmin;
					session.isGamemaster = storeUser.isGamemaster;
				}

				await client.close();
			}
			
			return session;
		}
	},
	providers: [
		Credentials({

			authorize: async (credentials): Promise<AuthUser> => {
				if(credentials) {
					await authorizeSchema.validate(credentials);
					
					const {client, database} = await mongoDbHelper.connect();
					const collection = database.collection('users');

					const user = await collection.findOne<User>({'email' : credentials.email});
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
						isGamemaster: user.isGamemaster,
						test: 'test'
					};
				}
                
				throw new Error('bad request');
			},
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Email' },
				password: {  label: 'Password', type: 'password' }
			}
		})
	]
});