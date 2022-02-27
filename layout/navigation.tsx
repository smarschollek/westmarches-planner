import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {useSession, signOut} from 'next-auth/react';

export const Navigation = (): ReactElement => {
	const {data} = useSession();
	
	const handleLogout = () => {
		signOut();
	};

	return(
		<Navbar bg='light' expand='lg' collapseOnSelect>
			<Container>
				<Navbar.Brand>
					<Image
						src='/images/ac.svg'
						width='30'
						height='30'
						className='d-inline-block align-top'
						alt='logo'
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbar' />
				<Navbar.Collapse id='navbar'>
					<Nav className='me-auto'>
						<Nav.Link eventKey='Dashboard' href={'/'}>Dashboard</Nav.Link>
						{ data && data.isGamemaster && <Nav.Link eventKey='/places' href='/places'>Places</Nav.Link> }
						{ data && data.isGamemaster && <Nav.Link eventKey='/quests' href='/quests'>Quests</Nav.Link> }
						{ data && data.isAdmin && <Nav.Link eventKey='/users' href='/users'>Users</Nav.Link> }
					</Nav>
					<Nav>
						<Nav.Link eventKey='my' href={'/my'}>{data?.user?.name}</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};