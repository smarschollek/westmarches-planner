import dayjs from 'dayjs';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);

export interface CalenderWeek {
    weekIndex: number,
    name: string,
    start: Date,
    stop: Date
	toString: () => string
}

export const getCalenderWeeks = () : CalenderWeek[] => {
	const result : CalenderWeek[] = [];

	for (let i = 0; i <= dayjs().isoWeeksInYear(); i++) {
		const week = dayjs().isoWeek(i);

		result.push({
			weekIndex: i, 
			name: 'KW' + (i+1),
			start: dayjs(week).isoWeekday(1).toDate(),
			stop: dayjs(week).isoWeekday(7).toDate()
		});
	}

	return result;
};

export const getWeekDays = (weekIndex : number) : Date[] => {
	const result : Date[] = [];
	const week = dayjs().isoWeek(weekIndex);
	for (let i = 1; i < 8; i++) {
		result.push(dayjs(week).isoWeekday(i).toDate());  
	}
	return result;
};

export const getCurrentWeek = () : number => {
	return dayjs().isoWeek();
};

export const groupTimes = (times: number[]) : number[][] => {
	if(times.length === 0) {
		return [];
	}
	if(times.length === 24) {
		return [[times[0], times[23]]];
	}
	
	const values : number[][] = [];
	let temp : number[] = [];
	
	temp.push(times[0]);
	for (let i = 1; i < times.length; i++) {
		const time = times[i];
		temp.push(time);
		if((time - temp[i-1]) > 1) {
			values.push([temp[0],temp[temp.length-2]]);
			temp=[time];
		}
	}

	if(temp.length !== 0) {
		values.push([temp[0],temp[temp.length-1]]);
	}

	return values;
};