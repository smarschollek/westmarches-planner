import { Button, Card, Chip, Divider, Fab, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExtendedSession } from '../helper/validate-session';
import { useUserConfig } from '../hooks/user-config-provider';
import { Character } from '../models/user-model';
import { MyList } from './my-list';

const UserDetails = () => {
	const data = useSession().data as ExtendedSession;
	const router = useRouter();
	const userConfig = useUserConfig();
	
	const [characters, setCharacters] = useState<Character[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await axios.get('/api/users/getCharacters');
			setCharacters(response.data);
		})();
	}, []);

	if(!data || !data.user) {
		return <></>;
	}

	const toggleTheme = () => {
		if(userConfig.theme === 'dark') {
			userConfig.setTheme('light');
		} else {
			userConfig.setTheme('dark');
		}
	};

	const handleRenderCallback = (character: Character) : JSX.Element => {
		return <ListItem>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
				<div>{character.name}</div>
				<Chip size='small' label={`${character.class} (${character.level})`}/>
			</Stack>
		</ListItem>;
	};

	return(
		<Stack gap={2} sx={{marginTop: 2}}>
			<div>
				<Typography gutterBottom variant='h6' component='div'>
		  			Infos
				</Typography>	
				<Stack gap={2}>
					<Stack direction='row' gap={1} alignItems='center' justifyContent={'space-between'}>
						<div>Name</div>
						<div>{data.user.name}</div>
					</Stack>
					<Stack direction='row' gap={1} alignItems='center' justifyContent={'space-between'}>
						<div>Email</div>
						<div>{data.user.email}</div>
					</Stack>
					<Stack direction='row' gap={1} alignItems='center' justifyContent={'space-between'}>
						<div>Roles</div>
						<Stack direction='row' gap={1}>
							<Chip size='small' label='User' />
							{ data.isAdmin && <Chip size='small' label='Admin' /> }
							{ data.isGamemaster && <Chip size='small' label='Gamemaster' /> }
						</Stack>
					</Stack>
				</Stack>
			</div>

			<div>
				<Typography gutterBottom variant='h6' component='div'>
	  				Characters
				</Typography>
				<Stack gap={1}>
					<MyList items={characters} renderCallback={handleRenderCallback}/>
					<Button fullWidth variant='contained' href='/characters/add'> Add Character </Button>
				</Stack>
			</div>

			<div>
				<Typography gutterBottom variant='h6' component='div'>
	  				Settings
				</Typography>	
				<Stack gap={2}>
					<Stack direction='row' gap={1} alignItems='center'>
						<Switch checked={userConfig.theme === 'dark'} onChange={toggleTheme}/>
						<div>Dark Mode</div>
					</Stack>

					<FormControl fullWidth>
						<InputLabel id='language-select-label'>Language</InputLabel>
						<Select
							labelId='language-select-label'
							id='language-select'
							value={userConfig.language}
							label='Language'
							onChange={e => userConfig.setLanguage(e.target.value as 'en' | 'de' ?? 'en')}
						>
							<MenuItem value={'en'}>English</MenuItem>
							<MenuItem value={'de'}>German</MenuItem>
						</Select>
					</FormControl>
					<Button disabled fullWidth variant='contained'> Change Password </Button>
				</Stack>
			</div>
		</Stack>
	);
};

export default UserDetails;