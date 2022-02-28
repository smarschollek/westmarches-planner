import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {useSession, signOut} from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faQuestion, faColumns, faUserFriends, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';

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
						<Nav.Link eventKey='Dashboard' href={'/'}>
							<FontAwesomeIcon icon={faColumns} className='me-2'/>
							Dashboard
						</Nav.Link>
						{ data && data.isGamemaster && <Nav.Link eventKey='/places' href='/places'>
							<FontAwesomeIcon icon={faMap} className='me-2'/>
							Places
						</Nav.Link> }
						{ data && data.isGamemaster && <Nav.Link eventKey='/quests' href='/quests'>
							<FontAwesomeIcon icon={faQuestion} className='me-2'/>
							Quests
						</Nav.Link> }
						{ data && data.isAdmin && <Nav.Link eventKey='/users' href='/users'>
							<FontAwesomeIcon icon={faUserFriends} className='me-2'/>
							Users
						</Nav.Link> }
					</Nav>
					<Nav>
						<Nav.Link eventKey='my' href={'/user'}>
							<FontAwesomeIcon icon={faUser} className='me-2'/>
							{data?.user?.name}
						</Nav.Link>
						<Nav.Link onClick={handleLogout}>
							<FontAwesomeIcon icon={faPowerOff} className='me-2'/>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};