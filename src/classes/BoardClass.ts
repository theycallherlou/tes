import { Position } from "../types/tetromino";

export default class BoardClass {
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


    public clearGrid(): void {
        this.grid = this.setGrid();
    }

    public clearFullLine(): number {
        let linesCleared = 0;

        this.grid = this.grid.filter(row => {
            const isFull = row.every(cell => cell !== 0);
            if (isFull) linesCleared++;
            return !isFull;
        });

        while (this.grid.length < this.rows) {
            this.grid.unshift(new Array(this.cols).fill(0));
        }

        return linesCleared;
    }

    public lockTetromino(shape: number[][], position: Position, type: string | number): void {
        shape.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 1) {
                    const x = position.x + colIndex;
                    const y = position.y + rowIndex;
                    if (this.isWithinBounds(x, y)) {
                        this.grid[y][x] = type;
                    }
                }
            });
        });
    }
    
    public checkCollision(shape: number[][], position: Position): boolean {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] === 1) {
                    const x = position.x + col;
                    const y = position.y + row;
                    if (!this.isWithinBounds(x, y) || this.grid[y][x] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public isWithinBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
    }
}
