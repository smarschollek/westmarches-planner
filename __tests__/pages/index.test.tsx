import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Home from '../../pages/index';

describe('Home', () => {

	const session : Session = {
		expires: Date.now().toString()
	};

	it('should render Quests', () => {
		//Arrange

		//Act
		render(<SessionProvider session={session}>
			<Home/>
		</SessionProvider>);

		const questHeaderElement = screen.getByText('Quests');
		const placesHeaderElement = screen.getByText('Places');

		//Assert
		expect(questHeaderElement).toBeInTheDocument();
		expect(placesHeaderElement).toBeInTheDocument();
	});
});