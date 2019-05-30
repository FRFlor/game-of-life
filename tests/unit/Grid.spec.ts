import Grid from '@/classes/Grid';
import Configurations from '@/classes/Configurations';
import Cell from '@/classes/Cell';

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

    it('Determines the correct neighbours for cells', () => {
        const grid: Grid = new Grid(ctx);

        const expectedNeighbours: Cell[] = [
            grid.getCellAt(0, 1),
            grid.getCellAt(1, 0),
            grid.getCellAt(1, 1),
        ];

        const cellSort = (left: Cell, right: Cell): number => {
            if (left.index < right.index) {
                return -1;
            }

            if (left.index > right.index) {
                return 1;
            }

            return 0;
        };

        expect(grid.getCellAt(0, 0).neighbours.sort(cellSort)).toEqual(expectedNeighbours.sort(cellSort));
    });

});
