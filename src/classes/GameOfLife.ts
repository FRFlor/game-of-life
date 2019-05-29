import Cell from '@/classes/Cell';

export default class GameOfLife {
    protected ctx: CanvasRenderingContext2D;
    protected cells: Cell[] = [];

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.cells[0] = new Cell(ctx, {row: 2, column: 1});
    }

    public render(): void {
        this.ctx.fillStyle = 'hsl(0, 0%, 15%)';
        this.ctx.fillRect(0, 0, 250, 250);
        this.cells[0].render();
    }
}
