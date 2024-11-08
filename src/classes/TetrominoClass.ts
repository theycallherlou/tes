import { Shape, Position, Type } from '../types/tetromino';
import { SHAPES } from '../constants/shapes';

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

}
