import {GridCoordinates} from '@/types';
import Configurations from '@/classes/Configurations';

export enum State {
    Pending,
    Dead,
    Alive,
}

export default class Cell {
    private static readonly fadeInRate: number = 50;
    private static readonly fadeOutRate: number = 35;
    public readonly neighbours: Cell[] = [];
    public currentState: State = State.Dead;
    public futureState: State = State.Pending;
    private position: GridCoordinates;
    private age: number = 0;
    private opacity: number;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, position: GridCoordinates, isAlive: boolean = false) {
        this.currentState = isAlive ? State.Alive : State.Dead;
        this.opacity = isAlive ? 100 : 0;
        this.ctx = ctx;
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
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x0, this.y0, this.width, this.height);
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
        return this.position.column * this.width;
    }

    public get y0(): number {
        return this.position.row * this.height;
    }

    public get row(): number {
        return this.position.row;
    }

    public get column(): number {
        return this.position.column;
    }

    public get index(): number {
        return this.position.column + this.position.row * Configurations.columnCount;
    }

    private get color(): string {
        const hue: number = this.age * 5;
        return `hsla(${hue},68%,56%, ${this.opacity / 100})`;
    }

    private get width(): number {
        return Math.ceil(this.ctx.canvas.width / Configurations.columnCount);
    }

    private get height(): number {
        return Math.ceil(this.ctx.canvas.height / Configurations.rowCount);
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
