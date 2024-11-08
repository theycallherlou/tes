import GameClass from "../classes/GameClass";

export interface IControls {
    gameInstance: GameClass;
    setScore: (score: number) => void;
    setGrid: (grid: (string | number)[][]) => void;
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
}
