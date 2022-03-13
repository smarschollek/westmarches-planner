import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../layout/layout';
import { Button, Chip, ListItemButton, Stack, Typography } from '@mui/material';
import { MyList } from '../../components/my-list';
import { Quest } from '../../modules/quests/quest-types';
import { useSession } from 'next-auth/react';
import { ExtendedSession } from '../../helper/validate-session';

const Page : NextPage = () => {
	const session = useSession().data as (ExtendedSession | null);
	const [quests, setQuests] = useState<Quest[]>([]);

	useEffect(()=> {
		(async () => {
			const response = await axios.get<Quest[]>('/api/quests/all');
			setQuests(response.data);
		})();
	}, []);

	if(!session) {
		return <></>;
	}

	const handleRenderCallback = (quest: Quest) : JSX.Element => {
		return (
			<ListItemButton component='a' href={`/quests/details/${quest._id}`}>
				<Stack sx={{width: '100%'}} direction='row' justifyContent='space-between' alignItems='center'>
					<Stack>
						<div>{quest.name}</div>
						<Typography variant='caption'>{`Gamemaster: ${quest.creator}`}</Typography>
					</Stack>
					<Stack gap={1} direction='row'>
						<Chip size='small' label={`Subscriber (${quest.subscriber.length})`}/>
						<Chip size='small' label={quest.questState} color={quest.questState === 'Open' ? 'success' : 'error'}/>
					</Stack>
				</Stack>
			</ListItemButton>
		);
	};

	if(!quests) {
		return <></>;
	}

	return(
		<Layout>
			<Stack gap={1} sx={{marginTop: 2}}>
				<Typography gutterBottom variant='h6' component='div' sx={{paddingLeft: 2, paddingTop: 1}}>
	  				Quests
				</Typography>
				<MyList items={quests} renderCallback={handleRenderCallback}/>
				{
					session.isGamemaster && (
						<Button 
							variant='contained'
							component='a'
							href='/quests/add'
						> Add Quest </Button>		
					)
				}
				
			</Stack>			
		</Layout>
	);
};

export default Page;