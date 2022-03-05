import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

type ThemeTypes = 'dark' | 'light'
type LanguageTypes = 'de' | 'en'

interface UserConfigContext {
    language: LanguageTypes
    theme: ThemeTypes

    setLanguage : (value: LanguageTypes) => void
    setTheme : (value: ThemeTypes) => void
}

const userConfigContext = createContext<UserConfigContext>({
	language: 'en',
	theme: 'light',
	setLanguage: () => {},
	setTheme: () => {}
});

export const useUserConfig = ()  => useContext(userConfigContext);

import { ReactElement } from 'react';

export const UserConfigProvider = ({children} : PropsWithChildren<unknown>): ReactElement => {
	const [theme, setTheme] = useState<ThemeTypes>('light');
	const [language, setLanguage] = useState<LanguageTypes>('en');
    
	useEffect(() => {
		setTheme(localStorage.getItem('theme') as ThemeTypes);
		setLanguage(localStorage.getItem('language') as LanguageTypes);
	}, []);

	useEffect(() => {
		localStorage.setItem('theme', theme);			
	}, [theme]);

	useEffect(() => {
		localStorage.setItem('language', language);
	}, [language]);

	const activeTheme = createTheme({
		palette: {
		  mode: theme,
			primary: {
				main: '#0b5ed7',
			},
			secondary: {
				main: '#5c636a',
			},
		},
	});

	const values : UserConfigContext = {
		language,
		theme,
		setTheme: (e: ThemeTypes) => setTheme(e),
		setLanguage: (e: LanguageTypes) => setLanguage(e)
	};

	return(
		<userConfigContext.Provider value={values}>
			<ThemeProvider theme={activeTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</userConfigContext.Provider>
	);
};