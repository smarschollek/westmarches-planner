import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export type ExtendedSession = Session & {
	isGamemaster: boolean,
	isAdmin: boolean
}

export const validateSession = async (req : NextApiRequest) : Promise<ExtendedSession> => {
	const session = await getSession({req});
	if(!session) {
		throw new Error('session is not valid');
	}

	return session as ExtendedSession;
};