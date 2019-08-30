import Grid from '@/classes/Grid';
import Glider, {GliderDirection} from '@/classes/patterns/Glider';
import {IGridCoordinates} from '@/types';

export default class InteractiveGameOfLife {
    private grid: Grid;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private cursorPosition?: IGridCoordinates;

    constructor(ctx: CanvasRenderingContext2D, columnCount: number, rowCount: number) {
        this.grid = new Grid(ctx, columnCount, rowCount);
        this.ctx = ctx;
        this.canvas = ctx.canvas;

        this.ctx.canvas.addEventListener('click', this.addGlider.bind(this), false);
        this.ctx.canvas.addEventListener('mousemove', this.updateCursorPosition.bind(this), false);
    }

    public update(): void {
        this.grid.update();
        this.renderCursor();
    }

    private addGlider(event: any): void {
        const {row, column} = this.getGridCoordinatesFromMouseEvent(event);
        Glider.PlaceAt(this.grid, {row: row - 4, column: column - 4}, GliderDirection.NorthWest);
        Glider.PlaceAt(this.grid, {row: row - 4, column: column + 2}, GliderDirection.NorthEast);
        Glider.PlaceAt(this.grid, {row: row + 2, column: column + 2}, GliderDirection.SouthEast);
        Glider.PlaceAt(this.grid, {row: row + 2, column: column - 4}, GliderDirection.SouthWest);
    }

    private renderCursor(): void {
        if (this.cursorPosition === undefined) {
            return;
        }

        const {row, column} = this.cursorPosition;
        this.grid.getCellAt({row: row - 1, column}).highlight('hsl(10,95%, 65%)');
        this.grid.getCellAt({row: row + 1, column}).highlight('hsl(10,95%, 65%)');
        this.grid.getCellAt({row, column: column - 1}).highlight('hsl(10,95%, 65%)');
        this.grid.getCellAt({row, column: column + 1}).highlight('hsl(10,95%, 65%)');
        this.grid.getCellAt({row, column}).highlight('hsl(50, 75%, 95%)');
    }

    private updateCursorPosition(event: any): void {
        this.cursorPosition = this.getGridCoordinatesFromMouseEvent(event);
    }

    private getGridCoordinatesFromMouseEvent(event: MouseEvent): IGridCoordinates {
        const baseX: number = this.ctx.canvas.offsetLeft;
        const baseY: number = this.ctx.canvas.offsetTop;
        const x: number = event.pageX - baseX;
        const y: number = event.pageY - baseY;
        const column: number = Math.floor(this.grid.columnCount * x / this.ctx.canvas.width);
        const row: number = Math.floor(this.grid.rowCount * y / this.ctx.canvas.height);

        return {row, column};
    }
}
