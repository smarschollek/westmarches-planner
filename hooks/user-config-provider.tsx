import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ExtendedSession } from '../helper/validate-session';
import { Character } from '../models/user-model';

type ThemeTypes = 'dark' | 'light'
type LanguageTypes = 'de' | 'en'

type UserInfo = {
	characters: Character[],
	subscribedQuests: string[],
	favoritPlaces: string[]
}

interface UserConfigContext {
    language: LanguageTypes
    theme: ThemeTypes
	userInfo: UserInfo
    setLanguage : (value: LanguageTypes) => void
    setTheme : (value: ThemeTypes) => void
	updateFavoritPlaces: (placeId: string) => void
	
}

const userConfigContext = createContext<UserConfigContext>({
	language: 'en',
	theme: 'light',
	userInfo: {
		characters: [],
		subscribedQuests:[],
		favoritPlaces: [],
	},
	setLanguage: () => {},
	setTheme: () => {},
	updateFavoritPlaces: () => {}
});

export const useUserConfig = ()  => useContext(userConfigContext);

export const UserConfigProvider = ({children} : PropsWithChildren<unknown>) => {
	const session = useSession().data as ExtendedSession;
	const [theme, setTheme] = useState<ThemeTypes>('light');
	const [language, setLanguage] = useState<LanguageTypes>('en');
	const [userInfo, setUserInfo] = useState<UserInfo>({characters: [], favoritPlaces:[], subscribedQuests: []});

	useEffect(() => {
		setTheme(localStorage.getItem('theme') as ThemeTypes);
		setLanguage(localStorage.getItem('language') as LanguageTypes);
		if(session) {
			(async () => {
				try {
					const response = await axios.get('/api/users/userinfo');
					setUserInfo(response.data);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setUserInfo({characters: [], favoritPlaces:[], subscribedQuests: []});
		}
	}, [session]);

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

	const updateFavoritPlaces = (placeId: string) => {
		const temp = [...userInfo.favoritPlaces];

		const index = temp.indexOf(placeId);
		if(index !== -1) {
			temp.splice(index,1);
		} else {
			temp.push(placeId);
		}

		setUserInfo({...userInfo, favoritPlaces: temp});
	};

	const values : UserConfigContext = {
		language,
		theme,
		userInfo,
		setTheme: (e: ThemeTypes) => setTheme(e),
		setLanguage: (e: LanguageTypes) => setLanguage(e),
		updateFavoritPlaces
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