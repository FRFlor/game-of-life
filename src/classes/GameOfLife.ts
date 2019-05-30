import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';

export default class GameOfLife {
    private ctx: CanvasRenderingContext2D;
    private cells: Cell[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        for (let column = 0; column < Configurations.columnCount; column++) {
            for (let row = 0; row < Configurations.rowCount; row++) {
                this.cells.push(new Cell(ctx, {row, column}));
            }
        }
    }

    public render(): void {
        this.ctx.fillStyle = 'hsl(0, 0%, 15%)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.cells.forEach( (cell: Cell) => cell.render() );
    }
}
