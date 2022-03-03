import axios from 'axios';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { Row, Col, Stack, Form } from 'react-bootstrap';
import { Layout } from '../layout/layout';
import { Character } from '../models/user-model';

interface CharackterSelectionProps {
	onChange : (character: Character) => void
}

export const CharackterSelection = ({onChange} : CharackterSelectionProps): ReactElement => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [fetched, setFetched] = useState(false);
    
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get<Character[]>('/api/users/getCharacters');
				setCharacters(response.data);
				onChange(response.data[0]);
				setFetched(true);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [onChange]);
    
	const mapCharacters = (characters: Character[]) => {
		return characters.map((character, index) => {
			return <option key={index} value={index}>{character.name}</option>;
		});
	};

	if(fetched && characters.length === 0) {
		return (
			<Layout>
				<Row>
					<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
						You need Characters to subscribe to a Quest. Create one <Link href='/user'>here</Link>
					</Col>
				</Row>
			</Layout>
		);
	}

	return(
		<Stack>
			<Form.Select onChange={(e) => onChange(characters[parseInt(e.currentTarget.value)])}>
				{mapCharacters(characters)}
			</Form.Select>
		</Stack>
	);
};