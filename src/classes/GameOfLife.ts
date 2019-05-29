export default class GameOfLife {
    protected canvas: CanvasRenderingContext2D;

    constructor(canvas: CanvasRenderingContext2D) {
        this.canvas = canvas;
    }

    public render(): void {
        this.canvas.fillStyle = 'green';
        this.canvas.fillRect(10, 10, 150, 100);
    }
}
