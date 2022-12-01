import {getColumn} from "./getColumn";

export function getBoxAround(index: number, size: number): Array<number> {
    const offset = size;

    const column = getColumn(index, size);
    let left = column > 0 ? index - 1 : -1;
    let right = column < size ? index + 1 : -1;

    const bottom = index + offset;
    const bottomColumn = getColumn(bottom, size);
    const bottomLeft = bottomColumn > 0 ? bottom - 1 : -1;
    const bottomRight = bottomColumn < size ? bottom + 1 : -1;

    const top = index - offset;
    const topColumn = getColumn(top, size);
    const topLeft = topColumn > 0 ? top - 1 : -1;
    const topRight = topColumn < size ? top + 1 : -1;

    return [

        topLeft,
        top,
        topRight,

        left,
        right,

        bottomLeft,
        bottom,
        bottomRight,
    ]
        .filter(v => v >= 0)
        .filter(v => v < size * size)
        ;
}
