import { Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ExtendedSession } from '../../../helper/validate-session';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../models/quest-model';


const Unsubscribe : NextPage = () => {
	const router = useRouter();
	const [quest, setQuest] = useState<Quest>();
	const data = useSession().data as ExtendedSession;
	useEffect(() => {
		(async () => {
			if(router.query.id) {
				const response = await axios.get(`/api/quests/get?id=${router.query.id}`);
				setQuest(response.data);
			}
			
		})();
	}, [router.query.id]);

	if(!quest) {
		return <></>;
	}

	const handleUnsubscribe = async () => {
		const char = quest.subscriber.find(x=>x.name === data.user?.name);
		if(char) {
			await axios.post('/api/quests/unsubscribe', {
				questId: router.query.id,
				subscriberId: char._id
			});
			router.back();    
		}
	};

	return(
		<Layout>
			<Stack gap={2} sx={{marginTop: 2}}>
				<Typography variant='body1'>
					Are you sure to unsubscribe from <b>{quest.name}</b> ?
				</Typography>
				<Button variant='contained' onClick={() => handleUnsubscribe()}> OK </Button>
				<Button variant='contained' color='secondary' onClick={() => router.back()}> Cancel </Button>
			</Stack>
		</Layout>
	);
};

export default Unsubscribe;