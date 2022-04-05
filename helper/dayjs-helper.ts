import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(isoWeek);

export interface CalenderWeek {
    weekIndex: number,
    name: string,
    start: Date,
    stop: Date
	toString: () => string
}

export interface WeekDay {
	name: string,
	num: string
	date: number
} 

export const getNextDays = (startDate: Dayjs, amount: number) : WeekDay[] => {
	const result : WeekDay[] = [];	
	for (let index = 0; index < amount; index++) {
		result.push(convertDaysJsToWeekDay(startDate.add(index, 'day')));
	}

	return result;
};

const convertDaysJsToWeekDay = (value: Dayjs) : WeekDay => {
	const names = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
	const name = names[value.isoWeekday()-1];
	return {
		name,
		num: value.format('DD'),
		date: value.valueOf()
	};
};

export const groupTimes = (times: number[]) : number[][] => {
	times = times.sort((a,b) => a-b);
	
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