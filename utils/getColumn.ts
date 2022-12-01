import {getRow} from "./getRow";

export function getColumn(index: number, size: number) {
    return index - (getRow(index, size) * size);
}
