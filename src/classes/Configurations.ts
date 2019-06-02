export default class Configurations {
    public static columnCount: number = 300;
    public static rowCount: number = 150;
    public static framesPerSecond: number = 15;

    public static get updateInterval(): number {
        return Math.floor(1000 / Configurations.framesPerSecond);
    }
}
