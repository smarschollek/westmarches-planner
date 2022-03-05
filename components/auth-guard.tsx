import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { getSession} from 'next-auth/react';
import { useRouter } from 'next/router';


const unprotectedComponents = ['/login', '/register'];

export const AuthGuard = ({children} : PropsWithChildren<unknown>): ReactElement => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if(!unprotectedComponents.includes(router.pathname)) {
			getSession().then(session => {
				if(!session) {
					router.push('/login');
				} else {
					setLoading(false);
				}
			});
		}
	}, [router]);

	if(unprotectedComponents.includes(router.pathname)) {
		return(
			<>
				{children}
			</>
		);
	}

	if(loading) {
		return <>authorize loading</>;
	}

	return(
		<>
			{children}
		</>
	);
};