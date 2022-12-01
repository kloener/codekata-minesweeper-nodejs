import {log} from "./utils/log";
import * as path from "path";
import {killMe} from "./utils/killMe";
import {parseMineMap} from "./utils/parseMineMap";
import fs from "fs/promises";

const [
    _nodePath,
    mainPath,
    mapFilename,
    solutionFilename,
] = process.argv;

if (!mapFilename || !solutionFilename) {
    log('Usage: npm run start -- map-file.txt solution-output.txt');
    killMe(1);
}

const mapFilePath = `${path.dirname(mainPath)}/${mapFilename}`;
const solutionFilePath = `${path.dirname(mainPath)}/${solutionFilename}`;

export async function run(mapFilePath: string, solutionFilePath: string) {
    const map = await parseMineMap(mapFilePath);
    if (!map) { return killMe(-1); }

    const rows = [];
    for (let i = 0; i < map.flatMap.length; i += map.size) {
        const row= [];
        for (let j = i; j < i + map.size; j++) {
            row.push(map.heatMap[j] >= 0 ? map.heatMap[j] : '*')
        }
        rows.push(row);
    }

    await fs.writeFile(solutionFilePath, rows.reduce(
        (content, row) => `${content}${row.join('')}\n`,
        ''
    ));
}

run(mapFilePath, solutionFilePath).catch(() => killMe(99));
