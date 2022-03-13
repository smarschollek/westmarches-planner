import { Button, Card, CardActions, CardContent, CardHeader, Chip, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyList } from '../../../components/my-list';
import { ExtendedSession } from '../../../helper/validate-session';
import { Layout } from '../../../layout/layout';
import { DayAndTime, PlayerInfo } from '../../../modules/common/common-types';
import { MyModal } from '../../../modules/common/components/MyModal';
import { TimeSelection } from '../../../modules/quests/components/time-selection';
import { SessionInfoResponse } from '../../api/quests/sessioninfo';
import { CreateSessionRequest } from '../../api/sessions/create';

const Page : NextPage = () => {
	const session = useSession().data as ExtendedSession;
	const router = useRouter();
	const [sessionInfos, setSessionInfos] = useState<SessionInfoResponse>();
	const [selectedDay, setSelectedDay] = useState<DayAndTime | null>(null);
	const [openModal, setOpenModal] = useState(false);
	const [selectedHours, setSelectedHours] = useState<number[]>([]);

	useEffect(() => {
		(async () => {
			const {id} = router.query;
			if(id) {
				const response = await axios.get(`/api/quests/sessioninfo?id=${id}`);
				setSessionInfos(response.data);
			}
		})();
	}, [router.query]);

	if(!sessionInfos || !session) {
		return <></>;
	}

	const renderTimesCallback = (day: DayAndTime) => {
		return (
			<ListItemButton selected={selectedDay === day} onClick={() => setSelectedDay(day)}>
				{day.day}
			</ListItemButton>
		);
	};

	const renderPlayerCallback = (player: PlayerInfo) => {
		return (
			<ListItemButton>
				<ListItemText 
					primary={player.character.name}
					secondary={`Player ( ${player.name} )`}
				/>
				<Chip size='small' label={`${player.character.class} (${player.character.level})`}></Chip>

			</ListItemButton>
		);
	};

	const renderModal = () => {
		const handleOKClick = async () => {
			if(!selectedDay) {
				return;
			}
			
			const data : CreateSessionRequest = {
				creator: session.user?.name!,
				questId: sessionInfos.questId,
				questName: sessionInfos.questName,
				date: { day: selectedDay.day, hours: selectedHours },
				players: sessionInfos.players
			};
			
			await axios.post('/api/sessions/create', data);
		};

		return (
			<Card sx={{width: 400}}>
				<CardHeader title='Session Summary'/>
				<CardContent>
					<Stack gap={2}>
						<Stack direction='row' justifyContent='space-between'>
							<div className='fw-light'>Questname</div>
							<div>{sessionInfos.questName}</div>
						</Stack>
						<Stack direction='row' justifyContent='space-between'>
							<div className='fw-light'>Day</div>
							<div>{selectedDay?.day}</div>
						</Stack>
						<Stack direction='row' justifyContent='space-between'>
							<div className='fw-light'>Time</div>
							<div>{`${selectedHours[0]}:00 - ${selectedHours[selectedHours.length-1]}:00`}</div>
						</Stack>
					</Stack>
				</CardContent>
				<CardActions>
					<Button fullWidth variant='contained' onClick={handleOKClick}> OK </Button>
					<Button fullWidth variant='contained' color='error' onClick={() => setOpenModal(false)}> Cancel </Button>
				</CardActions>
			</Card>
		);
	};

	return(
		<Layout>
			<MyModal open={openModal} content={renderModal()} onClose={() => setOpenModal(false)}/>
			<Stack gap={2} sx={{marginTop: 2}}>
				<Typography variant='h6'>
					Player
				</Typography>
				<MyList items={sessionInfos.players} renderCallback={renderPlayerCallback}/>
				<Typography variant='h6'>
					Times
				</Typography>
				<MyList items={sessionInfos.times} renderCallback={renderTimesCallback}/>
				{
					selectedDay && (
						<TimeSelection values={selectedDay.hours} onSelectionChanged={setSelectedHours}/>
					)
				}
				<Button variant='contained' onClick={() => setOpenModal(true)} disabled={selectedHours.length === 0}> OK </Button>
				<Button variant='contained' color='secondary'> Back </Button>
			</Stack>
		</Layout>
	);
};

export default Page;