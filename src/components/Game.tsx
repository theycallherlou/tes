import { useState, useEffect } from 'react';
import GameClass from '../classes/GameClass';
import Board from './Board';
import Controls from './Controls';
import styles from '../styles/game.module.css';

const gameInstance: GameClass = new GameClass();

export default function Game() {
    console.log('Game rendered');
    const [grid, setGrid] = useState<(string | number)[][]>(gameInstance.getCombinedGrid());
    const [score, setScore] = useState<number>(gameInstance.getScore());
    const [isRunning, setIsRunning] = useState<boolean>(gameInstance.getIsRunning());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isRunning) return;

            switch (event.key) {
                case 'ArrowLeft':
                    gameInstance.moveTetrominoLeft();
                    break;
                case 'ArrowRight':
                    gameInstance.moveTetrominoRight();
                    break;
                case 'ArrowDown':
                    gameInstance.moveTetrominoDown();
                    break;
                case 'ArrowUp':
                    gameInstance.rotateTetromino();
                    break;
                case 'p':
                    setIsRunning(!isRunning);
                    break;
                case 'r':
                    gameInstance.resetGame();
                    setIsRunning(true);
                    break;
                default:
                    break;
            }

            setGrid([...gameInstance.getCombinedGrid()]);
            setScore(gameInstance.getScore());
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isRunning]);

    useEffect(() => {
        let animationFrameId: number;

        const gameLoop = (time: number) => {
            if (!isRunning) return;

            gameInstance.update(time);
            setGrid([...gameInstance.getCombinedGrid()]);
            setScore(gameInstance.getScore());

            animationFrameId = requestAnimationFrame(gameLoop);
        };

            animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isRunning]);

    useEffect(() => {
        if (isRunning) {
            gameInstance.startGame();
        } else {
            gameInstance.stopGame();
        }

        return () => {
            gameInstance.stopGame();
        };
    }
    , [isRunning]);

    return (
        <div className={styles.gameContainer}>
            <div className={styles.scoreContainer}>Score: {score}</div>
            <Board grid={grid} />
           <Controls 
                gameInstance={gameInstance}
                setScore={setScore}
                setGrid={setGrid}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              />
        </div>
    );
}
