import Grid from '@/classes/Grid';
import Configurations from '@/classes/Configurations';
import Cell, {State} from '@/classes/Cell';
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

    it('Follows the \'Any live cell with less than 2 neighbours dies\' rule', () => {
        const grid: Grid = new Grid(ctx);
        const referenceCell: Cell = grid.getCellAt({row: 1, column: 1});
        referenceCell.currentState = State.Alive;

        grid.getCellAt({row: 0, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 0, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 0, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 2}).currentState = State.Dead;

        grid.update();

        expect(referenceCell.currentState).toBe(State.Dead);
    });

    it('Follows the \'Any live cell with 2 or 3 neighbours lives to the next generation\' rule', () => {
        const grid: Grid = new Grid(ctx);
        const referenceCell: Cell = grid.getCellAt({row: 1, column: 1});
        referenceCell.currentState = State.Alive;

        grid.getCellAt({row: 0, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 0, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 0, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 2}).currentState = State.Alive;

        grid.update();

        expect(referenceCell.currentState).toBe(State.Alive);
    });

    it('Follows the \'Any live cell with more than 3 neighbours dies\' rule', () => {
        const grid: Grid = new Grid(ctx);
        const referenceCell: Cell = grid.getCellAt({row: 1, column: 1});
        referenceCell.currentState = State.Alive;

        grid.getCellAt({row: 0, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 0, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 0, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 1, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 2, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 2}).currentState = State.Alive;

        grid.update();

        expect(referenceCell.currentState).toBe(State.Dead);
    });

    it('Follows the \'Any dead cell with exactly 3 neighbours becomes living in the next generation\' rule', () => {
        const grid: Grid = new Grid(ctx);
        const referenceCell: Cell = grid.getCellAt({row: 1, column: 1});
        referenceCell.currentState = State.Dead;

        grid.getCellAt({row: 0, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 0, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 0, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 1, column: 0}).currentState = State.Alive;
        grid.getCellAt({row: 1, column: 2}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 0}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 1}).currentState = State.Dead;
        grid.getCellAt({row: 2, column: 2}).currentState = State.Alive;

        grid.update();

        expect(referenceCell.currentState).toBe(State.Alive);
    });
});
