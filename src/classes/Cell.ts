import {GridCoordinates} from '@/types';
import Configurations from '@/classes/Configurations';

export enum State {
    Pending,
    Dead,
    Alive,
}

export default class Cell {
    public static setRenderer(ctx: CanvasRenderingContext2D): void {
        Cell.ctx = ctx;
    }

    // fadeRates are the delta opacity per tick.
    // e.g. A fadeOutRate of 50 would mean that a former living takes 2 ticks to fully disappear from the grid
    private static readonly fadeInRate: number = 50;
    private static readonly fadeOutRate: number = 30;
    private static ctx: CanvasRenderingContext2D;

    public readonly neighbours: Cell[] = [];
    public currentState: State = State.Dead;
    public futureState: State = State.Pending;
    private position: GridCoordinates;
    private age: number = 0;
    private opacity: number;

    constructor(position: GridCoordinates, isAlive: boolean = false) {
        this.currentState = isAlive ? State.Alive : State.Dead;
        this.opacity = isAlive ? 100 : 0;
        this.position = position;
    }

    public update(): void {
        if (this.futureState !== State.Pending) {
            return;
        }
        this.defineFutureState();
        this.updateOpacity();
    }

    public render(): void {
        Cell.ctx.fillStyle = this.color;
        Cell.ctx.fillRect(this.x0, this.y0, Cell.width * 0.85, Cell.height * 0.85);
    }

    public turnFutureIntoCurrentState(): void {
        this.currentState = this.futureState;
        this.futureState = State.Pending;
    }

    private updateOpacity(): void {
        const delta: number = this.isAlive ? Cell.fadeInRate : -Cell.fadeOutRate;
        this.opacity += delta;

        if (this.opacity < 0) {
            this.opacity = 0;
        }
        if (this.opacity > 100) {
            this.opacity = 100;
        }
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

    public get row(): number {
        return this.position.row;
    }

    public get column(): number {
        return this.position.column;
    }

    private get color(): string {
        const hue: number = this.age * 5;
        return `hsla(${hue},68%,56%, ${this.opacity / 100})`;
    }

    private static get width(): number {
        return Math.ceil(Cell.ctx.canvas.width / Configurations.columnCount);
    }

    private static get height(): number {
        return Math.ceil(Cell.ctx.canvas.height / Configurations.rowCount);
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
