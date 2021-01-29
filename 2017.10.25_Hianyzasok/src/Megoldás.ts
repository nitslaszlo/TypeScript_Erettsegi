import Hiányzó from "./Hiányzó";
import fs from "fs";

export default class Megoldás {
    private _hiányzók: Hiányzó[] = [];

    public get bejegyzésekSzáma(): number {
        return this._hiányzók.length;
    }

    public get összIgazolt(): number {
        let összIgazolt: number = 0;
        for (const h of this._hiányzók) {
            összIgazolt += h.igazoltDb;
        }
        return összIgazolt;
    }

    public get összIgazolatlan(): number {
        let összIgazolatlan: number = 0;
        for (const h of this._hiányzók) {
            összIgazolatlan += h.igazolatlanDb;
        }
        return összIgazolatlan;
    }

    public get legtöbbetHiányzóTanulók(): string[] {
        const stat: Map<string, number> = new Map<string, number>();
        this._hiányzók.forEach(i => {
            if (stat.has(i.név)) {
                const tanulóEddigiHiányzásai = stat.get(i.név) as number;
                stat.set(i.név, tanulóEddigiHiányzásai + i.hianyzasDb);
            } else {
                stat.set(i.név, i.hianyzasDb);
            }
        });

        const maxHiányzás: number = Math.max(...stat.values());
        const maxHiányzóTanulók: string[] = [];
        stat.forEach((value: number, key: string) => {
            if (value === maxHiányzás) maxHiányzóTanulók.push(key);
        });
        return maxHiányzóTanulók;
    }

    constructor(forrás: string) {
        let aktDátum: string = "";
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim(); // a trim() levágja a \r vezérlő karaktert a sor végéről
                if (aktSor[0] === "#") aktDátum = aktSor;
                // ha dátum adatot kell beolvasni
                else if (aktSor.length > 0) this._hiányzók.push(new Hiányzó(aktDátum, aktSor)); // ha tanuló nevét és hiányzását
            });
    }

    public megszámolHiányzások(napNeve: string, óra: string): number {
        let hiányzásokDb = 0;
        this._hiányzók.forEach(e => {
            hiányzásokDb += e.voltHiányzás(napNeve, parseInt(óra, 10)) ? 1 : 0;
        });
        return hiányzásokDb;
    }
}
