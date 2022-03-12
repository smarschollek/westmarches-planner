import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { getSession, useSession} from 'next-auth/react';
import { useRouter } from 'next/router';
import { ExtendedSession } from '../helper/validate-session';

interface RouteConfig {
	unprotected: string[]
	gamemasterOnly: string[]
	adminOnly: string[]
}

const routes : RouteConfig = {
	unprotected: ['/login', '/register'],
	gamemasterOnly: [
		'/quests/edit/[id]', 
		'/quests/create-session/[id]', 
		'/places/edit/[id]', 
		'/places/add', 
		'/quests/add'],
	adminOnly: []
};

export const AuthGuard = ({children} : PropsWithChildren<unknown>): ReactElement => {
	const router = useRouter();
	const [session, setSession] = useState<ExtendedSession>();

	useEffect(() => {
		if(!routes.unprotected.includes(router.pathname)) {
			getSession().then(session => {
				if(!session) {
					router.push('/login');
				} else {
					setSession(session as ExtendedSession);
				}
			});
		}
	}, [router]);

	if(routes.unprotected.includes(router.pathname)) {
		return(
			<>
				{children}
			</>
		);
	}

	if(!session) {
		return <></>;
	}

	

	if(routes.adminOnly.includes(router.pathname) && !session.isAdmin) {
		router.replace('/404');
		return <></>;
	}

	if(routes.gamemasterOnly.includes(router.pathname) && !session.isGamemaster) {
		router.replace('/404');
		return <></>;
	}

	return(
		<>
			{children}
		</>
	);
};