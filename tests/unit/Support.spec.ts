import {mirrorMatrixHorizontally, mirrorMatrixVertically} from '@/support';

describe('Support Functions', () => {

    describe('mirrorMatrixVertically function', () => {
        const given: number[][] = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ];

        const expectedResult: number[][] = [
            [0, 1, 1],
            [1, 0, 1],
            [0, 0, 1],
        ];

        it('mirrors a given matrix vertically', () => {
            expect(mirrorMatrixVertically(given)).toEqual(expectedResult);
        });

        it('does not modify the values of the original matrix', () => {
            expect(mirrorMatrixVertically(given)).not.toBe(given);
        });
    });

    describe('mirrorMatrixHorizontally function', () => {
        const given: number[][] = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ];

        const expectedResult: number[][] = [
            [1, 0, 0],
            [1, 0, 1],
            [1, 1, 0],
        ];

        it('mirrors a given matrix horizontally', () => {
            expect(mirrorMatrixHorizontally(given)).toEqual(expectedResult);
        });

        it('does not modify the values of the original matrix', () => {
            expect(mirrorMatrixHorizontally(given)).not.toBe(given);
        });
    });
});
