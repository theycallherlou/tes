import { Shape, Position, Type } from '../types/tetromino';
import { SHAPES } from '../constants/shapes';
import { COLORS } from '../constants/colors';

export default class TetrominoClass {
    private shape: Shape;
    private position: Position;
    private type: Type;

    constructor(position: Position, type: Type) {
        this.shape = SHAPES[type];
        this.position = position;
        this.type = type;
    }

    public getShape(): Shape {
        return this.shape;
    }

    public setShape(shape: Shape) {
        this.shape = shape;
    }

    public getPosition(): Position {
        return this.position;
    }

    public setPosition(position: Position) {
        this.position = position;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }


    public getColor(): string {
        return COLORS[this.type];
    }

    public setColor(color: string) {
        COLORS[this.type] = color;
    }

    public moveRight(): void {
        this.position = { ...this.position, x: this.position.x += 1 };
    }

    public moveDown(): void {
        this.position = { ...this.position, y: this.position.y += 1 };
    }

    public moveLeft(): void {
        this.position = { ...this.position, x: this.position.x -= 1 };
    }

    public moveUp(): void {
        this.position = { ...this.position, y: this.position.y -= 1 };
    }

    public rotate(): void {
        this.shape = this.rotateMatrix(this.shape);
    }

    private rotateMatrix(matrix: Shape): Shape {
        return matrix[0].map((_, colIdx) =>
            matrix.map(row => row[colIdx]).reverse()
        );
    }


}
