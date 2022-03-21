import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../../layout/layout';
import { WeekTimeSelection } from '../../../components/week-time-selection';
import { CharackterSelection } from '../../../components/charackter-selection';
import axios from 'axios';
import { SubscribeSummary } from '../../../components/subscribe-summary';
import { Button, Stack } from '@mui/material';
import { Character } from '../../../modules/users/user-types';
import { Quest } from '../../../modules/quests/quest-types';
import { DayAndTime } from '../../../modules/common/common-types';

const Subscribe : NextPage = () => {
	const [pageIndex, setPageIndex] = useState(0);
	const [character, setCharacter] = useState<Character>();
	const [times, setTimes] = useState<DayAndTime[]>([]);
	const [quest, setQuest] = useState<Quest>();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if(router.query.id) {
				try {
					const response = await axios.get(`/api/quests/get?id=${router.query.id}`);
					setQuest(response.data);
				} catch (error) {
					
				}
			}
		})();
	},[router.query.id]);

	const renderPages = () => {
		switch(pageIndex) {
		case 0: return <CharackterSelection onChange={setCharacter}/>;
		case 1: return <WeekTimeSelection onChange={setTimes} values={times}/>;
		case 2: return <SubscribeSummary quest={quest} character={character} times={times}/>;
		}
	};

	const stepBack = () => {
		if(pageIndex === 0) {
			router.back();
		} else {
			setPageIndex(pageIndex-1);
		}
	};

	const stepForward = async () => {
		if(pageIndex === 2) {
			await axios.post('/api/quests/subscribe', {
				characterId: character?._id,
				questId: quest?._id,
				times: times
			});
			router.replace('/');
		} else {
			setPageIndex(pageIndex+1);
		}
	};

	const disableNextStep = () => {
		switch(pageIndex) {
		case 0: return !character;
		case 1: return Object.keys(times).length === 0;
		}
	};

	return (
		<Layout>
			<Stack gap={1}>
				{renderPages()}
				<Button variant='contained' disabled={disableNextStep()} onClick={stepForward}> Next </Button>
				<Button variant='contained' color='secondary' onClick={stepBack}> Back </Button>
			</Stack>
		</Layout>
	);
};

export default Subscribe;