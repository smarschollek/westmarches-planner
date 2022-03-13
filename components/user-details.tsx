import { Button, Chip, FormControl, InputLabel, ListItemButton, MenuItem, Select, Stack, Switch, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { ExtendedSession } from '../helper/validate-session';
import { useUserConfig } from '../hooks/user-config-provider';
import { Character } from '../modules/users/user-types';
import { MyList } from './my-list';

const UserDetails = () => {
	const data = useSession().data as ExtendedSession;
	const {userInfo, language, setLanguage, theme, setTheme} = useUserConfig();	

	if(!data || !data.user) {
		return <></>;
	}

	const toggleTheme = () => {
		if(theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	const handleRenderCallback = (character: Character) : JSX.Element => {
		return <ListItemButton>
			<Stack direction='row' justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
				<div>{character.name}</div>
				<Chip size='small' label={`${character.class} (${character.level})`}/>
			</Stack>
		</ListItemButton>;
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
					<MyList items={userInfo.characters} renderCallback={handleRenderCallback}/>
					<Button fullWidth variant='contained' href='/characters/add'> Add Character </Button>
				</Stack>
			</div>

			<div>
				<Typography gutterBottom variant='h6' component='div'>
	  				Settings
				</Typography>	
				<Stack gap={2}>
					<Stack direction='row' gap={1} alignItems='center'>
						<Switch checked={theme === 'dark'} onChange={toggleTheme}/>
						<div>Dark Mode</div>
					</Stack>

					<FormControl fullWidth>
						<InputLabel id='language-select-label'>Language</InputLabel>
						<Select
							labelId='language-select-label'
							id='language-select'
							value={language}
							label='Language'
							onChange={e => setLanguage(e.target.value as 'en' | 'de' ?? 'en')}
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