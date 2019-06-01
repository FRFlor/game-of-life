import Cell from '@/classes/Cell';
import Configurations from '@/classes/Configurations';
import {IGridCoordinates} from '@/types';
import Glider from './patterns/Glider';

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

        this.ctx.canvas.addEventListener('click', this.addGlider.bind(this), false);
    }

    public render(): void {
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.forEachCell((cell: Cell) => cell.render());
        this.ctx.fillStyle = 'hsla(0, 0%, 0%, 0.33)';
    }

    public getCellAt({row, column}: IGridCoordinates): Cell {
        const rowWithWrapping: number = (row + Configurations.rowCount) % Configurations.rowCount;
        const columnWithWrapping: number = (column + Configurations.rowCount) % Configurations.rowCount;

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

    private addGlider(event: any): void {
        const baseX: number = this.ctx.canvas.offsetLeft;
        const baseY: number = this.ctx.canvas.offsetTop;

        const x: number = event.pageX - baseX;
        const y: number = event.pageY - baseY;
        const column: number = Math.floor(Configurations.columnCount * x / this.ctx.canvas.width);
        const row: number = Math.floor(Configurations.rowCount * y / this.ctx.canvas.height);
        Glider.PlaceAt(this, {row, column});
    }
}
