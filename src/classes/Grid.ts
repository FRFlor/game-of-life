import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';
import {IGridCoordinates} from '@/types';

export default class Grid {
    private ctx: CanvasRenderingContext2D;
    private cells: Cell[][] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        Cell.setRenderer(ctx);
        for (let row = 0; row < Configurations.rowCount; row++) {
            this.cells.push([]);
            for (let column = 0; column < Configurations.columnCount; column++) {
                this.cells[row].push(new Cell({row, column}, Math.random() < 0.25));
            }
        }

        this.linkCellsAsNeighbours();
        this.ctx.fillStyle = 'hsl(0, 0%, 0%)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    public render(): void {
        this.ctx.fillStyle = 'hsla(0, 0%, 0%, 0.33)'; // Fade-out for old cells
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.forEachCell((cell: Cell) => cell.render());
    }

    public getCellAt({row, column}: IGridCoordinates): Cell {
        const rowWithWrapping: number = (row + Configurations.rowCount) % Configurations.rowCount;
        const columnWithWrapping: number = (column + Configurations.columnCount) % Configurations.columnCount;

        return this.cells[rowWithWrapping][columnWithWrapping];
    }

    public update(): void {
        this.forEachCell((cell: Cell) => cell.update());
        this.forEachCell((cell: Cell) => cell.turnFutureIntoCurrentState());
        this.render();
    }

    private linkCellsAsNeighbours(): void {
        this.forEachCell((cell: Cell, row: number, column: number) => {
            for (const deltaRow of [-1, 0, 1]) {
                for (const deltaColumn of [-1, 0, 1]) {
                    if (deltaRow === 0 && deltaColumn === 0) {
                        continue;
                    }
                    const neighbourRow = row + deltaRow;
                    const neighbourColumn = column + deltaColumn;

                    cell.neighbours.push(this.getCellAt({row: neighbourRow, column: neighbourColumn}));
                }
            }
        });
    }

    private forEachCell(callback: (cell: Cell, row: number, column: number) => void): void {
        for (let row = 0; row < Configurations.rowCount; row++) {
            for (let column = 0; column < Configurations.columnCount; column++) {
                callback(this.cells[row][column], row, column);
            }
        }
    }
}
