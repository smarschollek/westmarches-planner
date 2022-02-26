import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PlaceEditForm, PlaceEdit } from '../../../components/place-edit';
import { Place } from '../../../types/Place';


const Add : NextPage = () => {
	const router  = useRouter();
	const [place, setPlace] = useState<PlaceEditForm>();

	useEffect(() => {
		(async() => {
			try {
				if(router.query.id) {
					const response = await axios.get<PlaceEditForm>(`/api/places/get?id=${router.query.id}`);
					setPlace(response.data);
				}
			} catch (error) {
				router.back();
			}
		})();
	}, [router, router.query.id]);

	const handleOnSubmit = async (formValues: PlaceEditForm) => {
		axios.post('/api/places/update', {...formValues});
	};

	if(!place) {
		return <></>;
	}

	return(
		<PlaceEdit onSubmit={handleOnSubmit} defaultValues={place}/>
	);
};

export default Add;