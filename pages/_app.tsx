import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';
import { AuthGuard } from '../components/auth-guard';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session} refetchInterval={0}>
			<AuthGuard>
				<Component {...pageProps} />
			</AuthGuard>
		</SessionProvider>
	);
}

export default MyApp;
