import { VaccinesOutlined } from '@mui/icons-material';
import { Times } from '../types/session-types';

interface TimeCondenser {
	days: (times: Times[][]) => Promise<Times[]>
	hours: (times: Times[]) => Promise<Times | undefined>
}

const days = async (times: Times[][]) : Promise<Times[]> => {	
	const flatten = times.flat();
	
	if(flatten.length === 0) {
		return [];
	}

	if(flatten.length === 1) {
		return flatten;
	}

	
	const days : string[] = [];
	flatten.forEach(x => {
		if(!days.includes(x.day)) {
			days.push(x.day);
		}
	});


	let temp : Times[] = [];
	days.forEach(x => {
		const result = flatten.filter(y => y.day === x);
		if(result.length === times.length) {
			temp = [...temp, ...result];
		}
	});

	return temp;
};

const hours = async (times: Times[]) : Promise<Times | undefined> => {
	if(times.length === 0) {
		return undefined;
	}
	
	const result : number[] = [];
	for (let i = 0; i <= 24; i++) {
		if(times.map(x => x.hours.includes(i)).every(x => x === true)) {
			result.push(i);
		}
	}

	return {
		day: times[0].day,
		hours: result
	};
};

export const timeCondenser : TimeCondenser = {
	days,
	hours
};