import {GridCoordinates} from '@/types';
import Configurations from '@/classes/Configurations';

export enum State {
    Pending,
    Dead,
    Alive,
}

export default class Cell {
    public readonly neighbours: Cell[] = [];
    public currentState: State = State.Dead;
    public futureState: State = State.Pending;
    private position: GridCoordinates;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D, position: GridCoordinates, isAlive: boolean = false) {
        this.currentState = isAlive ? State.Alive : State.Dead;
        this.ctx = ctx;
        this.position = position;
    }

    public update(): void {
        if (this.futureState !== State.Pending) {
            return;
        }
        this.defineFutureState();
    }

    public render(): void {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x0, this.y0, this.width, this.height);
    }

    public turnFutureIntoCurrentState(): void {
        this.currentState = this.futureState;
        this.futureState = State.Pending;
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
        return this.currentState === State.Alive ? 'hsl(21,68%,56%)' : 'hsl(0, 0%, 15%)';
    }

    private get width(): number {
        return Math.ceil(this.ctx.canvas.height / Configurations.columnCount);
    }

    private get height(): number {
        return Math.ceil(this.ctx.canvas.width / Configurations.rowCount);
    }

    private defineFutureState(): void {
        if (this.currentState === State.Dead && this.numberOfLivingNeighbours === 3) {
            this.futureState = State.Alive;
            return;
        }

        if ((this.currentState === State.Alive) &&
            (this.numberOfLivingNeighbours < 2 || this.numberOfLivingNeighbours > 3)) {
            this.futureState = State.Dead;
            return;
        }

        this.futureState = this.currentState;
    }

    private get numberOfLivingNeighbours(): number {
        return this.neighbours.filter((cell: Cell) => cell.currentState === State.Alive).length;
    }
}
