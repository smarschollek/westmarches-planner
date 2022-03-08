import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement } from 'react';
import { ExtendedSession } from '../helper/validate-session';

type PathInformation = {
    path: string,
    onlyGamemaster: boolean
    onlyAdmin: boolean
}

const pathInforamtions : PathInformation[] = [
	{
		path: '/places/edit/[id]',
		onlyGamemaster: true,
		onlyAdmin: false
	},
	{
		path: '/places/add',
		onlyGamemaster: true,
		onlyAdmin: false
	},
	{
		path: '/quests/edit/[id]',
		onlyGamemaster: true,
		onlyAdmin: false
	},
	{
		path: '/quests/add',
		onlyGamemaster: true,
		onlyAdmin: false
	}
];

export const PathProtector = ({children} : PropsWithChildren<unknown>): ReactElement => {
	const session = useSession().data as ExtendedSession;
	const router = useRouter();

	if(!session) {
		return <></>;
	}

	const path = pathInforamtions.find(x=>x.path === router.pathname);

	if(path?.onlyAdmin && !session.isAdmin) {
		router.replace('/404');
		return <></>;
	}

	if(path?.onlyGamemaster && !session.isGamemaster) {
		router.replace('/404');
		return <></>;
	}

	return(
		<>
			{children}
		</>
	);
};