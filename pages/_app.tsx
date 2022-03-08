import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from '../components/auth-guard';
import { UserConfigProvider } from '../hooks/user-config-provider';
import { PathProtector } from '../components/path-protector';





function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session} refetchInterval={0}>
			<UserConfigProvider>
				<AuthGuard>
					<PathProtector>
						<Component {...pageProps} />
					</PathProtector>					
				</AuthGuard>
			</UserConfigProvider>
		</SessionProvider>
	);
}

export default MyApp;
