import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from '../components/auth-guard';
import { UserConfigProvider } from '../hooks/user-config-provider';

function MyApp({ Component, pageProps }: AppProps) {
	return (

		<UserConfigProvider>
			<SessionProvider session={pageProps.session} refetchInterval={0}>
				<AuthGuard>
					<Component {...pageProps} />
				</AuthGuard>
			</SessionProvider>
		</UserConfigProvider>
	);
}

export default MyApp;
