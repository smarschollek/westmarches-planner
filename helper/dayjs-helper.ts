import dayjs, { Dayjs } from 'dayjs';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear.js';
import isLeapYear from 'dayjs/plugin/isLeapYear.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import dayOfYear from 'dayjs/plugin/DayOfYear.js';


dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

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
		const day = dayjs(week).isoWeekday(i).toDate();
		day.setHours(23);
		day.setMinutes(59);
		day.setSeconds(59);
		result.push(day);  
	}
	return result;
};

export const getCurrentWeek = () : number => {
	return dayjs().isoWeek();
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