import Grid from '../Grid';
import {IGridCoordinates} from '@/types';
import {State} from '@/classes/Cell';

export default class Glider {
    public static PlaceAt(grid: Grid, startPosition: IGridCoordinates) {
        const startRow: number = startPosition.row;
        const startColumn: number = startPosition.column;

        Glider.startShape.forEach((row: boolean[], deltaRow: number) => {
            row.forEach((isAlive: boolean, deltaColumn: number) => {
                grid.getCellAt({
                    row: startRow + deltaRow,
                    column: startColumn + deltaColumn,
                }).currentState = isAlive ? State.Alive : State.Dead;
            });
        });
    }

    protected static startShape: boolean[][] = [
        [false, false, true],
        [true, false, true],
        [false, true, true],
    ];
}
