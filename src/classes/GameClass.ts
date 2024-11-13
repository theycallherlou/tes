import { Position } from "../types/tetromino";
import BoardClass from "./BoardClass";
import TetrominoClass from "./TetrominoClass";
import { SHAPES } from "../constants/shapes";

export default class GameClass {
    private board: BoardClass;
    private tetromino: TetrominoClass | null;
    private isRunning: boolean;
    private score: number;
    private gameOver: boolean;
    private lastTime: number;
    private animationFrameId: number | null;
    private dropInterval: number;

    constructor() {
        this.board = new BoardClass();
        this.tetromino = null;
        this.isRunning = false;
        this.score = 0;
        this.gameOver = false;
        this.lastTime = 0;
        this.animationFrameId = null;
        this.dropInterval = 1000;
    }

    public getBoard(): BoardClass {
        return this.board;
    }

    public setBoard(board: BoardClass) {
        this.board = board;
    }

    public getTetromino(): TetrominoClass | null {
        return this.tetromino;
    }

    public setTetromino(tetromino: TetrominoClass) {
        this.tetromino = tetromino;
    }

    public getIsRunning(): boolean {
        return this.isRunning;
    }

    public setIsRunning(isRunning: boolean) {
        this.isRunning = isRunning;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number) {
        this.score = score;
    }

    public getGameOver(): boolean {
        return this.gameOver;
    }

    public setGameOver(gameOver: boolean) {
        this.gameOver = gameOver;
    }

    public getLastTime(): number {
        return this.lastTime;
    }

    public setLastTime(lastTime: number) {
        this.lastTime = lastTime;
    }

    public getAnimationFrameId(): number | null {
        return this.animationFrameId;
    }

    public setAnimationFrameId(animationFrameId: number | null) {
        this.animationFrameId = animationFrameId;
    }

    public getCombinedGrid(): (string | number)[][] {
        
        const combinedGrid = this.board.getGrid().map(row => [...row]);
        if (this.tetromino) {
            const shape = this.tetromino.getShape();
            const position = this.tetromino.getPosition();
            shape.forEach((row, rowIdx) => {
                row.forEach((col, colIdx) => {
                    if (col === 1) {
                        const x = position.x + colIdx;
                        const y = position.y + rowIdx;
                        if (this.board.isWithinBounds(x, y)) {
                            const type = this.tetromino?.getType();
                            if (type !== undefined) {
                                combinedGrid[y][x] = type;
                            }
                        }

                    }
                });
            });
        }
        return combinedGrid;
    }


    public startGame(): void {
        this.resetGame();
        this.isRunning = true;
        this.gameOver = false;
        this.spawnTetromino();
        this.lastTime = 0;
        this.animationFrameId = requestAnimationFrame(this.update);
    }

    public stopGame(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.isRunning = false;
    }

    public resetGame(): void {
        this.board = new BoardClass();
        this.tetromino = null;
        this.score = 0;
        this.isRunning = false;
        this.gameOver = false;
    }

    public update = (time: number) => {
        if (!this.isRunning || this.gameOver) return;

        const deltaTime = time - this.lastTime;
        if (deltaTime > this.dropInterval) {
            this.moveTetrominoDown();
            this.lastTime = time;
        }

        if (!this.gameOver) {
            this.animationFrameId = requestAnimationFrame(this.update.bind(this));
        }
    };

    public updateScore(linesCleared: number): void {
        this.score += linesCleared * 100;
    }

    public moveTetrominoRight(): void {
        if (this.tetromino) {
            const newPosition: Position = {
                ...this.tetromino.getPosition(),
                x: this.tetromino.getPosition().x + 1
            };

            if (!this.board.checkCollision(this.tetromino.getShape(), newPosition)) {
                this.tetromino.moveRight();
            }
        }
    }

    public moveTetrominoDown(): void {
        if (this.tetromino) {
            const newPosition: Position = { ...this.tetromino.getPosition(), y: this.tetromino.getPosition().y + 1 };
            if (!this.board.checkCollision(this.tetromino.getShape(), newPosition)) {
                this.tetromino.moveDown();
            } else {                
                this.board.lockTetromino(this.tetromino.getShape(), this.tetromino.getPosition(), this.tetromino.getType());
                const linesCleared = this.board.clearFullLine();
                if (linesCleared > 0) this.updateScore(linesCleared);
                this.spawnTetromino();
                if (this.board.checkCollision(this.tetromino.getShape(), this.tetromino.getPosition())) {
                    this.gameOver = true;
                    this.isRunning = false;
                    cancelAnimationFrame(this.animationFrameId!);
                }
            }
        }
    }
   
    public moveTetrominoLeft(): void {
        if (this.tetromino) {
            const newPosition: Position = {
                ...this.tetromino.getPosition(),
                x: this.tetromino.getPosition().x - 1
            };

            if (!this.board.checkCollision(this.tetromino.getShape(), newPosition)) {
                this.tetromino.moveLeft();
            }
        }
    }
    
    public rotateTetromino(): void {
        if (this.tetromino) {
            const originalShape = this.tetromino.getShape();
            this.tetromino.rotate();

            if (this.board.checkCollision(this.tetromino.getShape(), this.tetromino.getPosition())) {
                this.tetromino.setShape(originalShape);
            }
        }
    }
    public spawnTetromino(): void {
        const startPosition: Position = { x: Math.floor(this.board.cols / 2) - 1, y: 0 };
    
        const types = Object.keys(SHAPES);
        const randomType = types[Math.floor(Math.random() * types.length)];
    
        this.tetromino = new TetrominoClass(startPosition, randomType);
    
        if (this.board.checkCollision(this.tetromino.getShape(), this.tetromino.getPosition())) {
            this.gameOver = true;
            this.isRunning = false;
            cancelAnimationFrame(this.animationFrameId!);
        }    
    }
}

