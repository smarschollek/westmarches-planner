import { FunctionComponent, ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import { Navigation } from './navigation';

export const Layout : FunctionComponent = ({children}): ReactElement => {
	return(
		<>
			<Navigation/>
			<Container className='p-3'>
				{children}
			</Container>
		</>
	);
};