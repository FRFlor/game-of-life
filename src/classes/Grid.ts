import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';

export default class Grid {
    private ctx: CanvasRenderingContext2D;
    private cells: Cell[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        for (let column = 0; column < Configurations.columnCount; column++) {
            for (let row = 0; row < Configurations.rowCount; row++) {
                this.cells.push(new Cell(ctx, {row, column}));
            }
        }

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

    public render(): void {
        this.ctx.fillStyle = 'hsl(0, 0%, 15%)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.cells.forEach((cell: Cell) => cell.render());
    }

    public getCellAt(row: number, column: number): Cell {
        return this.cells[column + row * Configurations.columnCount];
    }
}
