import Image from 'next/image';
import { ReactElement, useState } from 'react';
import {useSession, signOut} from 'next-auth/react';
import { useRouter } from 'next/router';
import { AppBar, Avatar, Box, Button, Container, Divider, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, Stack, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import { ExtendedSession } from '../helper/validate-session';

export const Navigation = (): ReactElement => {
	const data = useSession().data as ExtendedSession;
	const router = useRouter();
	const [drawerState, setDrawerState] = useState(false);

	const handleLogout = async () => {
		await signOut();
		router.push('/login');
	};
   
	return(
		<>
			<SwipeableDrawer
				anchor='left'
				open={drawerState}
				onClose={() => setDrawerState(false)}
				onOpen={() => setDrawerState(true)}
			>
				<Box sx={{width: 250}}>
					<List>
						<ListItem >
							<ListItemButton component='a' href='/'>
								<ListItemIcon>
									<DashboardIcon/>
								</ListItemIcon>
								<Typography textAlign='center'>Dashboard</Typography>
							</ListItemButton>
						</ListItem>
						{
							data && data.isGamemaster && (
								<ListItem>
									<ListItemButton component='a' href='/places'>
										<ListItemIcon>
											<MapIcon/>
										</ListItemIcon>
										<Typography textAlign='center'>Places</Typography>
									</ListItemButton>
								</ListItem>
							)
						}
						{
							data && data.isGamemaster && (
								<ListItem>
									<ListItemButton component='a' href='/quests'>
										<ListItemIcon>
											<QuestionMarkIcon/>
										</ListItemIcon>
										<Typography textAlign='center'>Quests</Typography>
									</ListItemButton>	
								</ListItem>
							)
						}
						{
							data && data.isAdmin && (
								<>
									<Divider/>
									<ListItem>
										<ListItemButton component='a' href='/users'>
											<ListItemIcon>
												<GroupIcon/>
											</ListItemIcon>
											<Typography textAlign='center'>Users</Typography>
										</ListItemButton>
									</ListItem>
								</>
							)
						}
						<Divider/>
						<div style={{padding: 8}}>
							<Button fullWidth onClick={handleLogout} variant='contained' color='error' startIcon={<LogoutIcon/>}>
									Logout
							</Button>
						</div>
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
							<a href='https://strixhaven.vttrpg.de/' target='_blank' rel='noreferrer'>
								<Image
									src='/images/ac.svg'
									width='40'
									height='40'
									className='d-inline-block align-top'
									alt='logo'
								/>
							 </a>
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
							<a href='https://strixhaven.vttrpg.de/' target='_blank' rel='noreferrer'>
								<Image
									src='/images/ac.svg'
									width='40'
									height='40'
									className='d-inline-block align-top'
									alt='logo'
								/>
							 </a>
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>							
							<MenuItem component='a' href='/'>
								<ListItemIcon>
									<DashboardIcon/>
								</ListItemIcon>
								<Typography textAlign='center'>Dashboard</Typography>
							</MenuItem>
							{
								data && data.isGamemaster && (
									<MenuItem component='a' href='/places'>
										<ListItemIcon>
											<MapIcon/>
										</ListItemIcon>
										<Typography textAlign='center'>Places</Typography>
									</MenuItem>
								)
							}
							{
								data && data.isGamemaster && (
									<MenuItem component='a' href='/quests'>
										<ListItemIcon>
											<QuestionMarkIcon/>
										</ListItemIcon>
										<Typography textAlign='center'>Quests</Typography>
									</MenuItem>
								)
							}
							{
								data && data.isAdmin && (
									<MenuItem component='a' href='/users'>
										<ListItemIcon>
											<GroupIcon/>
										</ListItemIcon>
										<Typography textAlign='center'>Users</Typography>
									</MenuItem>
								)
							}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Stack direction={'row'} alignItems='center' gap={3}>
								<Button 
									variant='contained'
									color='error'
									startIcon={<LogoutIcon/>}
									sx={{ display: { xs: 'none', md: 'flex' } }}
									onClick={handleLogout}
								>
									Logout
								</Button>
								<IconButton href='/user' sx={{ p: 0 }}>
									<Avatar alt={data?.user?.name!} src='/static/images/avatar/2.jpg' />
								</IconButton>
							</Stack>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};