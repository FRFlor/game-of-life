import {IGridCoordinates} from '@/types';
import Configurations from '@/classes/Configurations';

export default class GridCoordinates implements IGridCoordinates {
    public row: number;
    public column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }

    public isAdjacentTo(other: GridCoordinates): boolean {
        if (this.row === other.row && this.column === other.column) {
            return false;
        }

        return this.rowDistance(other) <= 1 && this.columnDistance(other) <= 1;
    }

    protected rowDistance(other: GridCoordinates): number {
        return Math.min(
            Math.abs(this.row - other.row),
            Configurations.rowCount - Math.abs(this.row - other.row),
        );
    }

    protected columnDistance(other: GridCoordinates): number {
        return Math.min(
            Math.abs(this.column - other.column),
            Configurations.columnCount - Math.abs(this.column - other.column),
        );
    }
}
