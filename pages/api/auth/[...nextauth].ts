import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { userService } from '../../../modules/users/user-service';

export default NextAuth({
	providers: [
		DiscordProvider({
		  clientId: process.env.DISCORD_CLIENT_ID,
		  clientSecret: process.env.DISCORD_CLIENT_SECRET,
		})
	  ],
	secret: process.env.AUTH_SECRET,
	jwt: {
		maxAge: 60 * 60 * 24 * 7,
		secret: process.env.JWT_SECRET,
	},
	callbacks: {
		async session({ session }) {
			if(session.user) {
				let user = await userService.getByEmail(session.user.email!);
				if(!user) {
					await userService.create({
						name: session.user.name!,
						email: session.user.email!,
					});

					return {
						...session,
						isAdmin: false,
						isGamemaster: false
					};
				} 	
				
				return {
					...session,
					isAdmin: user.isAdmin,
					isGamemaster: user.isGamemaster
				};
			}

			return session;
		}
	}
});