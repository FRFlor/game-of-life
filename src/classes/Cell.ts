import {IGridCoordinates} from '@/types';

export enum State {
    Pending,
    Dead,
    Alive,
}

export default class Cell {
    public static setRenderer(ctx: CanvasRenderingContext2D): void {
        Cell.ctx = ctx;
    }

    public static setDimensions(cellWidth: number, cellHeight: number) {
        Cell.width = cellWidth;
        Cell.height = cellHeight;
    }

    private static ctx: CanvasRenderingContext2D;
    private static width: number = 0;
    private static height: number = 0;

    public readonly neighbours: Cell[] = [];
    public currentState: State = State.Dead;
    public futureState: State = State.Pending;
    public position: IGridCoordinates;
    private age: number = 0;

    constructor(position: IGridCoordinates, isAlive: boolean = false) {
        this.currentState = isAlive ? State.Alive : State.Dead;
        this.position = position;
    }

    public update(): void {
        if (this.futureState !== State.Pending) {
            return;
        }
        this.defineFutureState();
    }

    public render(): void {
        if (this.isDead) {
            return;
        }
        Cell.ctx.fillStyle = this.color;
        Cell.ctx.fillRect(this.x0, this.y0, Cell.width * 0.85, Cell.height * 0.85);
    }

    public highlight(color: string): void {
        Cell.ctx.fillStyle = color;
        Cell.ctx.fillRect(this.x0, this.y0, Cell.width * 0.85, Cell.height * 0.85);
    }

    public turnFutureIntoCurrentState(): void {
        this.currentState = this.futureState;
        this.futureState = State.Pending;
    }

    private defineFutureState(): void {
        if (this.isDead && this.numberOfLivingNeighbours === 3) {
            this.futureState = State.Alive;
            this.age = 0;
            return;
        }

        if (this.isAlive &&
            (this.numberOfLivingNeighbours < 2 || this.numberOfLivingNeighbours > 3)) {
            this.futureState = State.Dead;
            this.age = 0;
            return;
        }

        this.futureState = this.currentState;
        this.age++;
    }

    public get x0(): number {
        return this.position.column * Cell.width;
    }

    public get y0(): number {
        return this.position.row * Cell.height;
    }

    private get color(): string {
        const hue: number = this.age * 5;
        return `hsl(${hue},68%,56%)`;
    }

    private get numberOfLivingNeighbours(): number {
        return this.neighbours.filter((cell: Cell) => cell.currentState === State.Alive).length;
    }

    private get isAlive(): boolean {
        return this.currentState === State.Alive;
    }

    private get isDead(): boolean {
        return this.currentState === State.Dead;
    }
}
