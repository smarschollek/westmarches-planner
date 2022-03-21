import { FormControl, Grid, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { Character } from '../modules/users/user-types';

interface CharackterSelectionProps {
	onChange : (character: Character) => void
}

export const CharackterSelection = ({onChange} : CharackterSelectionProps): ReactElement => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [fetched, setFetched] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

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
			<Grid container alignItems='center' justifyContent='center' sx={{height: 100}}>
				<Link href='/user'> You need Characters to subscribe to a Quest. Create one here</Link>
			</Grid>
		);
	}

	const handleOnChange = (e : SelectChangeEvent<number>) => {
		const index = e.target.value as number;
		onChange(characters[index]);
		setSelectedIndex(index);
	};

	return(
		<Stack sx={{marginTop: 2}}>
			<FormControl fullWidth>
				<Select
					id='character-select'
					value={selectedIndex}
					onChange={handleOnChange}
				>
					{mapCharacters()}
				</Select>
			</FormControl>
		</Stack>
	);
};