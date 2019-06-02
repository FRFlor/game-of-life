import Grid from '../Grid';
import {IGridCoordinates} from '@/types';
import {State} from '@/classes/Cell';
import {mirrorMatrixHorizontally, mirrorMatrixVertically} from '@/support';

export enum GliderDirection {
    NorthEast,
    SouthEast,
    SouthWest,
    NorthWest,
}

export default class Glider {
    public static PlaceAt(grid: Grid,
                          startPosition: IGridCoordinates,
                          direction: GliderDirection = GliderDirection.SouthEast) {
        const startRow: number = startPosition.row;
        const startColumn: number = startPosition.column;

        Glider.startShape(direction).forEach((row: boolean[], deltaRow: number) => {
            row.forEach((isAlive: boolean, deltaColumn: number) => {
                grid.getCellAt({
                    row: startRow + deltaRow,
                    column: startColumn + deltaColumn,
                }).currentState = isAlive ? State.Alive : State.Dead;
            });
        });
    }

    protected static startShapeSE: boolean[][] = [
        [false, false, true],
        [true, false, true],
        [false, true, true],
    ];

    protected static startShape(direction: GliderDirection): boolean[][] {
        switch (direction) {
            case GliderDirection.SouthEast:
                return Glider.startShapeSE;
            case GliderDirection.SouthWest:
                return mirrorMatrixHorizontally<boolean>(Glider.startShapeSE);
            case GliderDirection.NorthWest:
                return mirrorMatrixVertically<boolean>(mirrorMatrixHorizontally<boolean>(Glider.startShapeSE));
            case GliderDirection.NorthEast:
                return mirrorMatrixVertically<boolean>(Glider.startShapeSE);
            default:
                return Glider.startShapeSE;
        }
    }
}

