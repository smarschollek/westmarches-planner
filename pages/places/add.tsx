import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PlaceEdit, PlaceEditForm } from '../../components/place-edit';
import { Layout } from '../../layout/layout';

const Add : NextPage = () => {
	const router = useRouter();

	const handleOnSubmit = async (formValues: PlaceEditForm) => {
		await axios.post('/api/places/add', {...formValues});
		router.back();
	};

	const defaultValues : PlaceEditForm = {
		description: '',
		imageGuid: '',
		name: ''
	}; 

	return(
		<Layout>
			<PlaceEdit onSubmit={handleOnSubmit} defaultValues={defaultValues}/>
		</Layout>
		
	);
};

export default Add;