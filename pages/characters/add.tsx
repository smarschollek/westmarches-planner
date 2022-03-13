import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
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
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<CharacterEdit onSubmit={handleOnSubmit} defaultValues={defaultValues} />
				</Col>
			</Row>
			
		</Layout>
	);
};

export default Page;