import BoardClass from "./BoardClass";
import TetrominoClass from "./TetrominoClass";

export default class GameClass {
    private board: BoardClass;
    private tetromino: TetrominoClass | null;
    private isRunning: boolean;
    private score: number;
    private gameOver: boolean;
    private lastTime: number;
    private animationFrameId: number | null;

    constructor() {
        this.board = new BoardClass();
        this.tetromino = null;
        this.isRunning = false;
        this.score = 0;
        this.gameOver = false;
        this.lastTime = 0;
        this.animationFrameId = null;
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
}
