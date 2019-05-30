import Grid from '@/classes/Grid';
import Configurations from '@/classes/Configurations';
import Cell from '@/classes/Cell';
import {GridCoordinates} from '@/types';

describe('Grid', () => {
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
    });

    describe('Determines the correct neighbours for cells', () => {

            it.each`
        position | neighbours
        ${{row: 0, column: 0}} | ${[
                {row: 0, column: 1},
                {row: 1, column: 1}, {row: 1, column: 0},
            ]}

        ${{row: 0, column: 1}} | ${[
                {row: 0, column: 0}, {row: 0, column: 2},
                {row: 1, column: 1}, {row: 1, column: 2}, {row: 1, column: 0},
            ]}

         ${{row: 1, column: 1}} | ${[
                {row: 0, column: 0}, {row: 0, column: 1}, {row: 0, column: 2},
                {row: 1, column: 0}, {row: 1, column: 2},
                {row: 2, column: 0}, {row: 2, column: 1}, {row: 2, column: 2},
            ]}
        `('Cell at $position', ({position, neighbours}) => {
                const grid: Grid = new Grid(ctx);

                const expectedNeighbours: Cell[] = neighbours
                    .map((neighbourPosition: GridCoordinates) => grid.getCellAt(neighbourPosition));

                const cellSort = (left: Cell, right: Cell): number => {
                    if (left.index < right.index) {
                        return -1;
                    }

                    if (left.index > right.index) {
                        return 1;
                    }

                    return 0;
                };

                expect(grid.getCellAt(position).neighbours.sort(cellSort)).toEqual(expectedNeighbours.sort(cellSort));
            });
        },
    );
});
