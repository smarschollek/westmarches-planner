import { Stack, Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import { ReactElement, useState } from 'react';
import { CharackterSelection } from '../../../components/charackter-selection';
import { DaySelection } from '../../../components/day-selection';
import { SubscribeSummary } from '../../../components/subscribe-summary';
import { TimeRangeSelection } from '../../../components/time-range-selection';
import { ExtendedSession } from '../../../helper/validate-session';
import { Layout } from '../../../layout/layout';
import { DayAndTime } from '../../common/common-types';
import { Character } from '../../users/user-types';
import { Quest, Subscriber } from '../quest-types';

const convertToDayAndTime = (values: string[]) : DayAndTime[] => {
	return values.map(x => ({
		day : x,
		hours: [18, 24]
	}));
};

const removeKnownDays = (values: string[], oldTimes : DayAndTime[]) => {
	const knownDays = oldTimes.map(x => x.day);
	return values.filter(x => !knownDays.includes(x));
};

const removeOldTimes = (values: string[], oldTimes : DayAndTime[]) : DayAndTime[] => {
	return oldTimes.filter(x => values.includes(x.day));
};

const getSubscriberInfo = (quest: Quest, username: string) : Subscriber | undefined => {
	return quest.subscriber.find(x => x.username === username);
};

const extractDays = (values: DayAndTime[]) : string[] => {
	return values.map(x => x.day);
};

const orderDayAndTime = (values: DayAndTime[]) : DayAndTime[] => {
	return [...values].sort((a,b) => {
		const firstDate = new Date(a.day).getDate();
		const secondDate = new Date(b.day).getDate();
		return firstDate - secondDate;
	});
};

interface SubscriptionWizardProps {
    quest: Quest
    onCancel: () => void
    onSubmit: (values: SubscriptionWizardValues) => void
}

export interface SubscriptionWizardValues {
    characterId: ObjectId
    questId: ObjectId
    times: DayAndTime[]
}

export const SubscriptionWizard = ({onCancel, onSubmit, quest} : SubscriptionWizardProps): ReactElement => {
	const session = useSession().data as ExtendedSession;
	const subscriberInfo = getSubscriberInfo(quest, session.user?.name!); 

	const [pageIndex, setPageIndex] = useState(0);
	const [character, setCharacter] = useState<Character>();
	const [selectedDays, setSelectedDays] = useState<string[]>(extractDays(subscriberInfo ? subscriberInfo.times : []));
	const [times, setTimes] = useState<DayAndTime[]>(subscriberInfo ? subscriberInfo.times : []);
	const [submitting, setSubmitting] = useState(false);
	
	
	const handleOnChangeDaySelection = (value: string[]) => {
		setSelectedDays(value);
		const newValues = convertToDayAndTime(removeKnownDays(value, times));
		const newTimes = removeOldTimes(value, times);
		setTimes(orderDayAndTime([...newTimes, ...newValues]));
	};

	const renderPages = () => {
		switch(pageIndex) {
			case 0: return <CharackterSelection onChange={setCharacter} selectedCharacterName={subscriberInfo ? subscriberInfo.character.name : undefined}/>;
			case 1: return <DaySelection onChange={handleOnChangeDaySelection} values={selectedDays}/>;
			case 2: return <TimeRangeSelection onChange={setTimes} values={times}/>;
			case 3: return <SubscribeSummary quest={quest} character={character} times={times}/>;
		}
	};

	const stepBack = () => {
		if(pageIndex === 0) {
			onCancel();
		} else {
			setPageIndex(pageIndex-1);
		}
	};

	const stepForward = async () => {
		if(pageIndex === 3) {
			setSubmitting(true);
			onSubmit({
				characterId: character?._id!,
			    questId: quest._id,
			    times: times
			});
		} else {
			setPageIndex(pageIndex+1);
		}
	};

	const disableNextStep = () => {
		switch(pageIndex) {
			case 0: return !character;
			case 1: return selectedDays.length === 0;
			case 2: return times.length === 0;
		}
	};

	return (
		<Layout>
			<Stack gap={1}>
				{renderPages()}
				<Button variant='contained' disabled={disableNextStep() || submitting} onClick={stepForward}> Next </Button>
				<Button variant='contained' color='secondary' onClick={stepBack}> Back </Button>
			</Stack>
		</Layout>
	);
};