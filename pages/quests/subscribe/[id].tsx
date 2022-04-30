import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubscriptionWizard, SubscriptionWizardValues } from '../../../modules/quests/components/subscription-wizard';
import { Quest } from '../../../modules/quests/quest-types';

const Subscribe : NextPage = () => {
	const router = useRouter();
	const [quest, setQuest] = useState<Quest>();
	
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

	if(!quest) {
		return <></>;
	}

	const handleOnCancel = () => {
		router.back();
	};

	const handleOnSubmit = async (values: SubscriptionWizardValues) => {
		await axios.post('/api/quests/subscribe', values);
		router.replace('/');
	};

	return (
		<SubscriptionWizard
			quest={quest}
			onCancel={handleOnCancel}
			onSubmit={handleOnSubmit}
		/>
	);
};

export default Subscribe;