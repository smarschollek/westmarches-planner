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
}

export const getCalenderWeeks = () : CalenderWeek[] => {
	const result : CalenderWeek[] = [];

	for (let i = 0; i < dayjs().isoWeeksInYear(); i++) {
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