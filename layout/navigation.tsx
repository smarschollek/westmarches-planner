import Image from 'next/image';
import { ReactElement, useState, MouseEvent } from 'react';
import {useSession, signOut} from 'next-auth/react';
import { useRouter } from 'next/router';
import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, List, ListItem, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, Tooltip, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Logout } from '@mui/icons-material';

export const Navigation = (): ReactElement => {
	const {data} = useSession();
	const router = useRouter();
	const [drawerState, setDrawerState] = useState(false);

	const handleLogout = async () => {
		await signOut();
		router.push('/login');
	};
   
	return(
		// <Navbar bg='light' expand='lg' collapseOnSelect>
		// 	<Container>
		// 		<Navbar.Brand>
		// 			<Image
		// 				src='/images/ac.svg'
		// 				width='30'
		// 				height='30'
		// 				className='d-inline-block align-top'
		// 				alt='logo'
		// 			/>
		// 		</Navbar.Brand>
		// 		<Navbar.Toggle aria-controls='navbar' />
		// 		<Navbar.Collapse id='navbar'>
		// 			<Nav className='me-auto'>
		// 				<Nav.Link eventKey='Dashboard' href={'/'}>
		// 					<FontAwesomeIcon icon={faColumns} className='me-2' style={{width: '16px'}}/>
		// 					Dashboard
		// 				</Nav.Link>
		// 				{ data && data.isGamemaster && <Nav.Link eventKey='/places' href='/places'>
		// 					<FontAwesomeIcon icon={faMap} className='me-2' style={{width: '16px'}}/>
		// 					Places
		// 				</Nav.Link> }
		// 				{ data && data.isGamemaster && <Nav.Link eventKey='/quests' href='/quests'>
		// 					<FontAwesomeIcon icon={faQuestion} className='me-2' style={{width: '16px'}}/>
		// 					Quests
		// 				</Nav.Link> }
		// 				{ data && data.isAdmin && <Nav.Link eventKey='/users' href='/users'>
		// 					<FontAwesomeIcon icon={faUserFriends} className='me-2' style={{width: '16px'}}/>
		// 					Users
		// 				</Nav.Link> }
		// 			</Nav>
		// 			<Nav>
		// 				<Nav.Link eventKey='my' href={'/user'}>
		// 					<FontAwesomeIcon icon={faUser} className='me-2' style={{width: '16px'}}/>
		// 					{data?.user?.name}
		// 				</Nav.Link>
		// 				<Nav.Link onClick={handleLogout}>
		// 					<FontAwesomeIcon icon={faPowerOff} className='me-2' style={{width: '16px'}}/>
		// 					Logout
		// 				</Nav.Link>
		// 			</Nav>
		// 		</Navbar.Collapse>
		// 	</Container>
		// </Navbar>
		<>
			<SwipeableDrawer
				
				anchor='left'
				open={drawerState}
				onClose={() => setDrawerState(false)}
				onOpen={() => setDrawerState(true)}
			>
				<Box sx={{width: 250}}>
					<List>
						<ListItem button>
							<DashboardIcon sx={{marginRight: 1}}/>
							<ListItemText>Dashboard</ListItemText>
						</ListItem>
						<ListItem button>
							<MapIcon sx={{marginRight: 1}}/>
							<ListItemText>Places</ListItemText>
						</ListItem>
						<ListItem button>
							<QuestionMarkIcon sx={{marginRight: 1}}/>
							<ListItemText>Quests</ListItemText>
						</ListItem>
						<Divider/>
						<ListItem button onClick={handleLogout}>
							<Logout sx={{marginRight: 1}}/>
							<ListItemText>Logout</ListItemText>
						</ListItem>
					</List>
				</Box>
			</SwipeableDrawer>
		
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							<Image
								src='/images/ac.svg'
		 					width='40'
		 					height='40'
		 					className='d-inline-block align-top'
		 					alt='logo'
		 				/>
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={() => setDrawerState(true)}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
						</Box>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
						>
							<Image
								src='/images/ac.svg'
		 					width='40'
		 					height='40'
		 					className='d-inline-block align-top'
		 					alt='logo'
		 				/>
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Button>Hello</Button>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<IconButton onClick={() => {}} sx={{ p: 0 }}>
								<Avatar alt={data?.user?.name!} src='/static/images/avatar/2.jpg' />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};