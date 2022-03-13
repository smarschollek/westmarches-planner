import { DayAndTime } from '../../common/common-types';
import { timeCondenser } from './time-condenser';

describe('TimeCondenser', () => {
	describe('days', () => {
		test('when called and timepropositins are emtpy returns empty array', async () => {
			//Arrange
        
			//Act
			const result = await timeCondenser.days([]);
			
			//Assert
			expect(result).toEqual([]);
		});

		test('when called and timepropositins contains only one element returns that element', async () => {
			//Arrange
			const times : DayAndTime[][] = [
				[
					{
						day: 'Sun Mar 06 2022',
						hours: [1,2,3]
					}
				]
			];

			const expectedTimes = [
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3]
				}
			];

			//Act
			const result = await timeCondenser.days(times);
			
			//Assert
			expect(result).toEqual(expectedTimes);
		});

		test('when called returns all days that exists at least once in all sub arrays', async () => {
			//Arrange
			const times : DayAndTime[][] = [
				[
					{
						day: 'Sun Mar 06 2022',
						hours: [1,2,3,4]
					},
					{
						day: 'Sun Mar 07 2022',
						hours: [1,2,3]
					}
				],
				[
					{
						day: 'Sun Mar 06 2022',
						hours: [1,2,3]
					}
				],
				[
					{
						day: 'Sun Mar 06 2022',
						hours: [1,2,3,4,5]
					},
					{
						day: 'Tue Mar 08 2022',
						hours: [1,2]
					}
				]
			];

			const expectedTimes = [
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,4]
				},
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3]
				},
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,4,5]
				}
			];


			//Act
			const result = await timeCondenser.days(times);
			
			//Assert
			expect(result).toEqual(expectedTimes);
		});
	});

	describe('hours', () => {
		test('when called and times is empty returns empty array', async () => {
			//Arrange
        
			//Act
			const result = await timeCondenser.hours([]);
			
			//Assert
			expect(result).toEqual([]);
		});

		test('when called returns overlapping times', async () => {
			//Arrange
			const times : DayAndTime[] = [
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3]
				},
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,4]
				}
			];
			//Act
			const result = await timeCondenser.hours(times);
			
			//Assert
			expect(result).toEqual([
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3]
				}
			]);
		});

		test('when called returns overlapping times even with gaps in between', async () => {
			//Arrange
			const times : DayAndTime[] = [
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
				},
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,7,8,9,10,14,15,16,20,21,22,23,24]
				},
				{
					day: 'Sun Mar 07 2022',
					hours: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
				},
				{
					day: 'Sun Mar 07 2022',
					hours: [20,21,22,23,24]
				}
			];
			//Act
			const result = await timeCondenser.hours(times);
			
			//Assert
			expect(result).toEqual([
				{
					day: 'Sun Mar 06 2022',
					hours: [1,2,3,7,8,9,10,14,15,16,20,21,22,23,24]
				},
				{
					day: 'Sun Mar 07 2022',
					hours: [20,21,22,23,24]
				}
			]);
		});
	});
});