import { groupTimes } from '../../helper/dayjs-helper';

describe('dayjs-helper', () => {
	describe('groupTimes', () => {
		test('should return "Whole Day" when all times are selected' , () => {
			//Arrange
			const times = [
				1,2,3,
				4,5,6,
				7,8,9,
				10,11,12,
				13,14,15,
				16,17,18,
				19,20,21,
				22,23,24
			];

			//Act
			const result = groupTimes(times);

			//Assert
			expect(result).toEqual([[1,24]]);
		});

		test('should return grouped values when not all times are selected' , () => {
			//Arrange
			const times = [
				1,2,3,
				4,5,6,
				7,8,9,
				10,11,12,
				13,14,15,
				16,17,18,
				19,20,21,
				22,
			];

			//Act
			const result = groupTimes(times);

			//Assert
			expect(result).toEqual([[1, 22]]);
		});

		test('should return grouped values when there are gaps between selected times' , () => {
			//Arrange
			const times = [
				1,2,3,4,5,6,
				20,22,23,24
			];

			//Act
			const result = groupTimes(times);

			//Assert
			expect(result).toEqual([[1,6], [20,24]]);
		});

		test('should return grouped values even if start and stop time is the same for a timerange' , () => {
			//Arrange
			const times = [
				4,5,6,7,8,9,10,11,12,
				21
			];

			//Act
			const result = groupTimes(times);

			//Assert
			expect(result).toEqual([[4,12], [21,21]]);
		});
	});
});