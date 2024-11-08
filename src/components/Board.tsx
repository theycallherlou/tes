import styles from '../styles/board.module.css';
import { IBoard } from '../types/board';

export default function Board({ grid }: IBoard) {
    return (
        <div className={styles.boardContainer}>
            <div className={styles.board}>
                {
                    grid.map((row, rowIdx) => (
                        row.map((col, colIdx) => (
                            <div 
                                key={`${rowIdx}-${colIdx}`} 
                                className={`${styles.boardCol} ${typeof col === 'string' ? styles[`tetromino-${col.toLowerCase()}`] : ''}`}
                            />
                        ))
                    ))
                }
            </div>
        </div>
    );
}
