import Áthajtás from "./Áthajtás";
import fs from "fs";

export default class Megoldás {
    private _forgalom: Áthajtás[] = [];

    public get utolsóKihatás(): Áthajtás {
        const kihajtások: Áthajtás[] = this._forgalom.filter(x => x.ezKihajtás);
        const utolsóIndex = kihajtások.length - 1;
        return kihajtások[utolsóIndex];
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length != 0) {
                    this._forgalom.push(new Áthajtás(aktSor));
                }
            });
    }
}
