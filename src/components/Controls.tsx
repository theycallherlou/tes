import styles from '../styles/controls.module.css';
import { IControls } from '../types/controls';
export default function Controls({ gameInstance, setScore, setGrid, isRunning, setIsRunning }: IControls) {
  function handleStart() {
    gameInstance.startGame();
      setIsRunning(true);
      setScore(gameInstance.getScore());
      setGrid([...gameInstance.getCombinedGrid()]);
  }
  return (
    <div className={styles.buttonContainer}>
      <button onClick={() => setIsRunning(!isRunning)} type="button">
          {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleStart} type="button">Reset</button>
    </div>
  )
}
