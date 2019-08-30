import Grid from '@/classes/Grid';
import Cell, {State} from '@/classes/Cell';
import {IGridCoordinates} from '@/types';


describe('Grid', () => {
    let canvas: HTMLCanvasElement;
    const canvasSize: number = 30;
    let ctx: CanvasRenderingContext2D;
    let columnCount = 1;
    let rowCount = 1;

    const sortCoordinates = (left: IGridCoordinates, right: IGridCoordinates): number => {
        const leftIndex: number = left.column + left.row * columnCount;
        const rightIndex: number = right.column + right.row * rowCount;

        if (leftIndex < rightIndex) {
            return -1;
        }

        if (leftIndex > rightIndex) {
            return 1;
        }

        return 0;
    };

    beforeEach(() => {
        canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    });

    describe('Determines the correct neighbours for cells', () => {
            it('When a cell is in the middle of the grid', () => {
                columnCount = 3;
                rowCount = 3;
                const grid: Grid = new Grid(ctx, columnCount, rowCount);

                const referenceCell: Cell = grid.getCellAt({row: 1, column: 1});
                const expectedNeighboursCoordinates: IGridCoordinates[] = [
                    {row: 0, column: 0},
                    {row: 0, column: 1},
                    {row: 0, column: 2},
                    {row: 1, column: 0},
                    {row: 1, column: 2},
                    {row: 2, column: 0},
                    {row: 2, column: 1},
                    {row: 2, column: 2},
                ].sort(sortCoordinates);
                const actualNeighboursCoordinates: IGridCoordinates[] = referenceCell.neighbours
                    .map((neighbour: Cell) => neighbour.position)
                    .sort(sortCoordinates);

                expect(actualNeighboursCoordinates).toEqual(expectedNeighboursCoordinates);
            });


            it.each`
        position | neighbours
        ${{row: 0, column: 0}} | ${[
                {row: 0, column: 1}, {row: 0, column: 3},
                {row: 1, column: 0}, {row: 1, column: 1}, {row: 1, column: 3},
                {row: 3, column: 0}, {row: 3, column: 1}, {row: 3, column: 3},
            ]}

        ${{row: 3, column: 1}} | ${[
                {row: 0, column: 0}, {row: 0, column: 1}, {row: 0, column: 2},
                {row: 2, column: 0}, {row: 2, column: 1}, {row: 2, column: 2},
                {row: 3, column: 0}, {row: 3, column: 2},
            ]}
        `('At the edge: $position',
                ({position, neighbours}: { position: IGridCoordinates, neighbours: IGridCoordinates[] }) => {
                    rowCount = 4;
                    columnCount = 4;

                    const grid: Grid = new Grid(ctx, columnCount, rowCount);

                    const referenceCell: Cell = grid.getCellAt(position);
                    const expectedNeighboursCoordinates: IGridCoordinates[] = neighbours.sort(sortCoordinates);
                    const actualNeighboursCoordinates: IGridCoordinates[] = referenceCell.neighbours
                        .map((neighbour: Cell) => neighbour.position)
                        .sort(sortCoordinates);

                    expect(actualNeighboursCoordinates).toEqual(expectedNeighboursCoordinates);
                });
        },
    );

    it('Follows the \'Any live cell with less than 2 neighbours dies\' rule', () => {
        columnCount = 3;
        rowCount = 3;
        const grid: Grid = new Grid(ctx, columnCount, rowCount);
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
        columnCount = 3;
        rowCount = 3;
        const grid: Grid = new Grid(ctx, columnCount, rowCount);
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
        const grid: Grid = new Grid(ctx, columnCount, rowCount);
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
        const grid: Grid = new Grid(ctx, columnCount, rowCount);
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

