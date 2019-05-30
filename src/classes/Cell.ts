import {GridCoordinates} from '@/types';
import Configurations from '@/classes/Configurations';

export default class Cell {
    protected position: GridCoordinates;
    protected ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, position: GridCoordinates) {
        this.ctx = ctx;
        this.position = position;
    }

    public render(): void {
        this.ctx.fillStyle = this.color();
        this.ctx.fillRect(this.x0, this.y0, this.width, this.height);
    }

    protected color(): string {
        const hue: number = 50 * (this.position.column + this.position.row * Configurations.columnCount);
        const randomBetween = (max: number, min: number): number => Math.floor(Math.random() * (max - min + 1) + min);

        return `hsl(${hue},${randomBetween(50, 100)}%,${randomBetween(50, 100)}%)`;
    }

    public get x0(): number {
        return this.position.column * this.width;
    }

    public get y0(): number {
        return this.position.row * this.height;
    }

    protected get width(): number {
        return Math.ceil(this.ctx.canvas.height / Configurations.columnCount);
    }

    protected get height(): number {
        return Math.ceil(this.ctx.canvas.width / Configurations.rowCount);
    }
}
