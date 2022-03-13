import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardContent, CardMedia, FormControl, MenuItem, Select, Slider, Stack, TextField } from '@mui/material';

const classes: string[] = [
	'Artificer',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Warlock',
	'Wizard',
];

export type CharacterEditFormValues = {
    name: string,
    class: string,
    level: number,
    description: string
}

type CharacterEditProps = {
    defaultValues?: CharacterEditFormValues
    onSubmit: (formValues: CharacterEditFormValues) => void
}

export const CharacterEdit = ({defaultValues, onSubmit}: CharacterEditProps): ReactElement => {
	const router = useRouter();
    
	const {control, handleSubmit, watch, formState} = useForm<CharacterEditFormValues>({
		defaultValues,
		mode: 'onChange'
	});

	const levelValue = watch('level');

	return(
		<form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 16}}>
			<Card>
				<CardContent>
					<Stack gap={2}>
						<Controller
							render={({field, fieldState}) => (
								<TextField fullWidth id='input-name' placeholder='Name' 
									value={field.value}
									onChange={field.onChange}
									label={'Name'}
									error={!!fieldState.error}
									helperText={fieldState.error && 'Error'}
								/>
							)}
							control={control}
							name='name'
							rules={{required: true}}
						/>
						<Controller
							render={({field}) => (
								<FormControl fullWidth>
									<Select
										value={field.value}
										onChange={field.onChange}
									>
										{ classes.map((value, index) => {
											return <MenuItem  key={index} value={value}>{value}</MenuItem>;
										}) }
									</Select>
								</FormControl>)}
							control={control}
							name='class'
							defaultValue={defaultValues?.class}
						/>
						<Controller
							render={({field}) => (
								<FormControl fullWidth>
									Level: {field.value}
									<Slider
										aria-label='Volume'
										min={1}
										max={20}
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>)}
							control={control}
							name='level'
							defaultValue={defaultValues?.level ?? 1}
						/>
						
						<Controller
							render={({field, fieldState}) => (
								<TextField fullWidth id='input-description' 
									value={field.value}
									onChange={field.onChange}	
									placeholder='Description' 
									multiline minRows={5} maxRows={15}
									label={'Description'}
									error={!!fieldState.error}
									helperText={fieldState.error && 'Error'}
								/>)}
							control={control}
							name='description'
							defaultValue={defaultValues?.description}
						/>
						
						<Button 
							type='submit'
							variant='contained'
							disabled={!formState.isValid}
						>
								Save
						</Button>
						<Button variant='contained' color='secondary' onClick={() => router.back()}>Cancel</Button>
					</Stack>
				</CardContent>
			</Card>
		</form>

	);
};