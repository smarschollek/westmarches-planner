import { FormControl, Grid, MenuItem, Select, Stack } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
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
    
	const mapCharacters = () => {
		return characters.map((character, index) => {
			return <MenuItem key={index} value={index}>{character.name}</MenuItem>;
		});
	};

	if(fetched && characters.length === 0) {
		return (
			<Layout>
				<Grid alignItems='center'>
					You need Characters to subscribe to a Quest. Create one <Link href='/user'>here</Link>
				</Grid>
			</Layout>
		);
	}

	return(
		<Stack sx={{marginTop: 2}}>
			<FormControl fullWidth>
				<Select
					id='character-select'
					value={0}
					onChange={(e) => onChange(characters[e.target.value as number])}
				>
					{mapCharacters()}
				</Select>
			</FormControl>
		</Stack>
	);
};