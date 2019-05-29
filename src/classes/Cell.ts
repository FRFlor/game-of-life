import {GridCoordinates} from '@/types';

export default class Cell {
    public position: GridCoordinates;
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
        return 'green';
    }

    protected get x0(): number {
        return 0;
    }

    protected get y0(): number {
        return 0;
    }

    protected get width(): number {
        return 50;
    }

    protected get height(): number {
        return 50;
    }
}
