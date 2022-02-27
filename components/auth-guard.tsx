import { FunctionComponent, ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const AuthGuard : FunctionComponent = ({children}): ReactElement => {
	const {data, status} = useSession();
	const router = useRouter();
	console.log(status);
	if(status === 'loading') {
		return <>Loading...</>;
	}

	if(status === 'unauthenticated') {
		router.push('/login');
		return <></>;
	}
    
	return(
		<>
			{children}
		</>
	);
};