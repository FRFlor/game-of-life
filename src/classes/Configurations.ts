export default class Configurations {
    public static columnCount: number = 100;
    public static rowCount: number = 100;
    public static framesPerSecond: number = 15;

    public static get updateInterval(): number {
        return Math.floor(1000 / Configurations.framesPerSecond);
    }
}
