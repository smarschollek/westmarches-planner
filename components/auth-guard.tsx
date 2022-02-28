import { PropsWithChildren, ReactElement } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface AuthGuardProps {
	componentName: string
}

export const AuthGuard = ({children, componentName} : PropsWithChildren<AuthGuardProps>): ReactElement => {
	const {status} = useSession();
	const router = useRouter();
	const unprotectedComponents = ['Login', 'Register'];
	
	if(unprotectedComponents.includes(componentName)) {
		return(
			<>
				{children}
			</>
		);
	}

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