import { DayAndTime } from '../../common/common-types';

interface TimeCondenser {
	days: (times: DayAndTime[][]) => Promise<DayAndTime[]>
	hours: (times: DayAndTime[]) => Promise<DayAndTime[]>
}

const days = async (times: DayAndTime[][]) : Promise<DayAndTime[]> => {	
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


	let temp : DayAndTime[] = [];
	days.forEach(x => {
		const result = flatten.filter(y => y.day === x);
		if(result.length === times.length) {
			temp = [...temp, ...result];
		}
	});

	return temp;
};

const hours = async (times: DayAndTime[]) : Promise<DayAndTime[]> => {	
	// const result : number[] = [];
	// for (let i = 0; i <= 24; i++) {
	// 	if(times.map(x => x.hours.includes(i)).every(x => x === true)) {
	// 		result.push(i);
	// 	}
	// }

	// return {
	// 	day: times[0].day,
	// 	hours: result
	// };

	const filterDayTimes = (items: DayAndTime[]) : number[] => {
		const result : number[] = [];
		for (let i = 0; i <= 24; i++) {
			if(items.map(x => x.hours.includes(i)).every(x => x === true)) {
				result.push(i);
			}
		}

		return result;
	};

	const result : DayAndTime[] = [];
	const days : string[] = [];
	for(const time of times) {
		if(!days.includes(time.day)) {
			days.push(time.day);
		}
	}

	for(const day of days) {
		const dayTimes = times.filter(x => x.day === day);
		const overlappingHours = filterDayTimes(dayTimes);
		result.push({
			day,
			hours: overlappingHours
		});
	}

	return result;
};

export const timeCondenser : TimeCondenser = {
	days,
	hours
};