import { Stack } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CharacterEdit, CharacterEditFormValues } from '../../components/character-edit';
import { Layout } from '../../layout/layout';

const Page : NextPage = () => {
	const router = useRouter();
	const defaultValues : CharacterEditFormValues = {
		name: '',
		class: 'Artificer',
		description: '',
		level: 1
	};
	
	const handleOnSubmit = async (formValues: CharacterEditFormValues) => {
		try {
			await axios.post('/api/users/createCharacter', formValues);
			router.back();
		} catch (error) {
			
		}
	};
    
	return(
		<Layout>
			<Stack sx={{marginTop: 2}}>
				<CharacterEdit onSubmit={handleOnSubmit} defaultValues={defaultValues} />			
			</Stack>
		</Layout>
	);
};

export default Page;