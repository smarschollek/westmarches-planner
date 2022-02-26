import axios from 'axios';
import { NextPage } from 'next';
import { PlaceEdit, PlaceEditForm } from '../../components/place-edit';
import { Layout } from '../../layout/layout';

const add : NextPage = () => {
	
	const handleOnSubmit = async (formValues: PlaceEditForm) => {
		axios.post('/api/places/add', {...formValues});
	};

	return(
		<Layout>
			<PlaceEdit onSubmit={handleOnSubmit}/>
		</Layout>
		
	);
};

export default add;