import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';

describe('Cell', () => {
    let canvas: HTMLCanvasElement;
    const canvasSize: number = 30;
    let ctx: CanvasRenderingContext2D;

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        Configurations.rowCount = 3;
        Configurations.columnCount = 3;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        Cell.setRenderer(ctx);
    });

    describe('Renders to the correct canvas coordinates', () => {
        it.each`
        row | column | x | y
        ${0} | ${0} | ${0} | ${0}
        ${0} | ${1} | ${10} | ${0}
        ${0} | ${2} | ${20} | ${0}
        ${1} | ${0} | ${0} | ${10}
        ${1} | ${1} | ${10} | ${10}
        ${1} | ${2} | ${20} | ${10}
        ${2} | ${0} | ${0} | ${20}
        ${2} | ${1} | ${10} | ${20}
        ${2} | ${2} | ${20} | ${20}
        `('On a 3x3 grid - for row: $row, column: $column', ({row, column, x, y}: any) => {
            const cell: Cell = new Cell({row, column});
            const expected = { x, y };
            const actual = {x: cell.x0, y: cell.y0};
            expect(expected).toEqual(actual);
        });
    });

});
