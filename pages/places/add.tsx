import axios from 'axios';
import { NextPage } from 'next';
import { PlaceEdit, PlaceEditForm } from '../../components/place-edit';

const add : NextPage = () => {
	
	const handleOnSubmit = async (formValues: PlaceEditForm) => {
		axios.post('/api/places/add', {...formValues});
	};

	return(
		<PlaceEdit onSubmit={handleOnSubmit}/>
	);
};

export default add;