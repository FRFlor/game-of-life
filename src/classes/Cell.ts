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
        this.ctx.fillStyle = this.color;
        this.ctx.rect(this.x0, this.y0, this.width, this.height);
        this.ctx.fill();
    }

    protected get color(): string {
        const hue: number = 20 * (this.position.column + this.position.row * Configurations.columnCount);
        return `hsl(${hue},75%,50%)`;
    }

    protected get x0(): number {
        return this.position.column * this.width;
    }

    protected get y0(): number {
        return this.position.row * this.height;
    }

    protected get width(): number {
        return Math.ceil(this.ctx.canvas.height / Configurations.rowCount);
    }

    protected get height(): number {
        return Math.ceil(this.ctx.canvas.width / Configurations.columnCount);
    }
}
