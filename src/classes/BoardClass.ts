export default class Board {
    private rows: number;
    private cols: number;
    private grid: (string | number)[][];

    constructor(rows: number = 20, cols: number = 10) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.setGrid();
    }

    public getGrid(): (number | string)[][] {
        return this.grid;
    }

    private setGrid() {
        return Array.from({ length: this.rows }, () => Array.from({ length: this.cols }, () => ''));
    }
}
