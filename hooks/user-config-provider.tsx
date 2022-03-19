import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ExtendedSession } from '../helper/validate-session';
import { Place } from '../modules/places/place-types';
import { GameSession } from '../modules/sessions/session-types';
import { Character, FavoritPlace } from '../modules/users/user-types';

type ThemeTypes = 'dark' | 'light'
type LanguageTypes = 'de' | 'en'

type UserInfo = {
	characters: Character[],
	subscribedQuests: string[],
	favoritPlaces: FavoritPlace[]
}

interface UserConfigContext {
    language: LanguageTypes
    theme: ThemeTypes
	userInfo: UserInfo
    setLanguage : (value: LanguageTypes) => void
    setTheme : (value: ThemeTypes) => void
	updateFavoritPlaces: (place: Place) => void
	
}

const userConfigContext = createContext<UserConfigContext>({
	language: 'en',
	theme: 'light',
	userInfo: {
		characters: [],
		subscribedQuests:[],
		favoritPlaces: []
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
		const storedTheme = localStorage.getItem('theme');
		if(storedTheme) {
			setTheme(storedTheme as ThemeTypes);
		}
		
		const storedLanguage = localStorage.getItem('language');
		if(storedLanguage) {
			setLanguage(storedLanguage as LanguageTypes);
		}
		
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

	const updateFavoritPlaces = (place: Place) => {
		const temp = [...userInfo.favoritPlaces];

		const index = temp.findIndex(x => x.placeId === place._id.toString());
		if(index !== -1) {
			temp.splice(index,1);
		} else {
			temp.push({
				placeId: place._id.toString(),
				name: place.name
			});
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