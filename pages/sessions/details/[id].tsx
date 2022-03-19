import { Alert, AlertTitle, Chip, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyList } from '../../../components/my-list';
import { Layout } from '../../../layout/layout';
import { PlayerInfo } from '../../../modules/common/common-types';
import { GetSessionDetailsResponse } from '../../api/sessions/get';

const Page : NextPage = () => {
	const router = useRouter();
	const [session, setSession] = useState<GetSessionDetailsResponse>();

	useEffect(() => {
		(async () => {
			const {id} = router.query;
			if(id) {
				const response = await axios.get(`/api/sessions/get?id=${id}`);
				setSession(response.data);
			}
		})();
	}, [router.query]);
	
	if(!session) {
		return <></>;
	}

	const renderPlayerCallback = (playerInfo: PlayerInfo) => {
		return (
			<ListItemButton>
				<ListItemText 
					primary={playerInfo.character.name}
					secondary={`Player ( ${playerInfo.name} )`}
				/>
				<Chip size='small' label={`${playerInfo.character.class} (${playerInfo.character.level})`}></Chip>
			</ListItemButton>
		);
	};

	return(
		<Layout>
			<Stack gap={2} sx={{marginTop: 2}}>
				<Alert severity='info' sx={{marginTop: 3, marginBottom: 3}}>
					<AlertTitle><strong>Gamesesson date</strong></AlertTitle>
					{session.date.day} From {session.date.hours[0]}:00 till {session.date.hours[session.date.hours.length -1]}:00 
				</Alert>
				<div>
					<Stack gap={2}>
						<Stack direction='row' gap={1} alignItems='center' justifyContent={'space-between'}>
							<div>Questname</div>
							<div>{session.quest.name}</div>
						</Stack>
						<Stack direction='row' gap={1} alignItems='center' justifyContent={'space-between'}>
							<div>Gamemaster</div>
							<div>{session.gamemaster}</div>
						</Stack>
					</Stack>
				</div>
				<div>
					<Typography gutterBottom variant='h6' component='div'>
		  			Player
					</Typography>	
					<MyList items={session.players} renderCallback={renderPlayerCallback}/>
				</div>
			</Stack>
		</Layout>
	);
};

export default Page;