import axios from 'axios';
import { NextPage } from 'next';
import { Row, Col } from 'react-bootstrap';
import { CharacterEdit, CharacterEditFormValues } from '../../components/character-edit';
import { Layout } from '../../layout/layout';

const Page : NextPage = () => {
	const defaultValues : CharacterEditFormValues = {
		name: '',
		class: 'Artificer',
		comment: '',
		level: 1
	};
	
	const handleOnSubmit = async (formValues: CharacterEditFormValues) => {
		try {
			await axios.post('/api/users/createCharacter', formValues);
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