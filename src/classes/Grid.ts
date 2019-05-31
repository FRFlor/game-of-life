import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';
import {GridCoordinates} from '@/types';

export default class Grid {
    private ctx: CanvasRenderingContext2D;
    private cells: Cell[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        Cell.setRenderer(ctx);
        for (let row = 0; row < Configurations.rowCount; row++) {
            for (let column = 0; column < Configurations.columnCount; column++) {
                this.cells.push(new Cell({row, column}, Math.random() < 0.25));
            }
        }

        this.linkCellsAsNeighbours();
        this.ctx.fillStyle = 'hsl(0, 0%, 0%)';
    }

    public render(): void {
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.cells.forEach((cell: Cell) => cell.render());
        this.ctx.fillStyle = 'hsla(0, 0%, 0%, 0.33)';
    }

    public getCellAt({row, column}: GridCoordinates): Cell {
        return this.cells[column + row * Configurations.columnCount];
    }

    public update(): void {
        this.cells.forEach((cell: Cell) => cell.update());
        this.cells.forEach((cell: Cell) => cell.turnFutureIntoCurrentState());
        this.render();
    }

    private linkCellsAsNeighbours(): void {
        this.cells.forEach((mainCell: Cell) => {
            const adjacentCells: Cell[] = this.cells.filter((otherCell: Cell) => {
                if (mainCell === otherCell) {
                    return false;
                }

                if (Math.abs(mainCell.row - otherCell.row) > 1 ||
                    Math.abs(mainCell.column - otherCell.column) > 1) {
                    return false;
                }

                return true;
            });

            mainCell.neighbours.push(...adjacentCells);
        });
    }
}
