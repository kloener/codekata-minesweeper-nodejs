import {log} from "./log";
import {killMe} from "./killMe";
import {MINE} from "../const/MINE";
import {STONE} from "../const/STONE";
import {getBoxAround} from "./getBoxAround";
import fs from "fs/promises";

export async function parseMineMap(mapFilePath: string) {
    log('Start reading map', mapFilePath);
    let fileContents: string;

    try {
        fileContents = await fs.readFile(mapFilePath, {encoding: 'utf-8'});
    } catch (err: unknown) {
        log('Error parsing map file.');
        return killMe(2);
    }

    const flatMap = fileContents.match(new RegExp(`([${MINE}${STONE}])`, 'g'));

    if (!flatMap) {
        log('Error invalid map file.');
        return killMe(3);
    }

    const size = Math.sqrt(flatMap.length);
    const heatMap = flatMap.reduce((minesMap, current, index) => {
        if (current === MINE) {
            const box = getBoxAround(index, size);
            minesMap[index] = -1;
            for (const boxIndex of box) {
                if (minesMap[boxIndex] >= 0) {
                    minesMap[boxIndex]++;
                }
            }
        }
        return minesMap;
    }, new Array<number>(flatMap.length).fill(0));

    return {fileContents, flatMap, heatMap, size};
}
