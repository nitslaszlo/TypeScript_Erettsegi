import fs from "fs";
import Felszállás from "./Felszállás";
import FelszállásBérlet from "./FelszállásBérlet";
import FelszállásJegy from "./FelszállásJegy";

interface ImaxKeresés {
    maxFelszálló: number;
    maxElsőMegálló: number;
}

export default class Megoldás {
    private _utasadatok: Felszállás[] = [];

    public get felszállókSzáma(): number {
        return this._utasadatok.length;
    }

    public get érvénytelenFelszállás(): number {
        return this._utasadatok.filter(x => !x.érvényesFelszállás).length;
    }

    public get maxKeresMap(): ImaxKeresés {
        const max: ImaxKeresés = { maxFelszálló: -1, maxElsőMegálló: -1 };
        const statMap: Map<number, number> = new Map<number, number>();
        this._utasadatok.forEach(i => {
            if (statMap.has(i.megállóSorszáma)) {
                statMap.set(i.megállóSorszáma, (statMap.get(i.megállóSorszáma) as number) + 1);
            } else {
                statMap.set(i.megállóSorszáma, 1);
            }
        });
        max.maxFelszálló = Math.max(...statMap.values());
        for (const [key, value] of statMap) {
            if (value === max.maxFelszálló) {
                max.maxElsőMegálló = key;
                break;
            }
        }
        return max;
    }

    public get maxKeresArray(): ImaxKeresés {
        const max: ImaxKeresés = { maxFelszálló: -1, maxElsőMegálló: -1 };
        const statArray: number[] = new Array(30).fill(0); // 30 elemű, nullával feltöltött vektor inicializálása
        this._utasadatok.forEach(i => {
            statArray[i.megállóSorszáma]++;
        });
        max.maxFelszálló = Math.max(...statArray);
        for (const i in statArray) {
            if (statArray[i] === max.maxFelszálló) {
                max.maxElsőMegálló = parseInt(i);
                break;
            }
        }
        return max;
    }

    public get ingyenesenUtazók(): number {
        return this._utasadatok.filter(x => x.ingyenesUtazás).length;
    }

    public get kedvezményesenUtazók(): number {
        return this._utasadatok.filter(x => x.kedvezményesUtazás).length;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor = i.trim();
                const típus = aktSor.split(" ")[3];
                if (típus === "JGY") {
                    this._utasadatok.push(new FelszállásJegy(aktSor));
                }
                if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(típus)) {
                    this._utasadatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }

    public figyelmeztetéseketÁllománybaÍr(állomány: string): void {
        const ki: string[] = [];
        const bérletesUtazások: FelszállásBérlet[] = this._utasadatok.filter(x => x instanceof FelszállásBérlet) as FelszállásBérlet[];
        bérletesUtazások.forEach(i => {
            if (i.érvényesFelszállás && i.lejárHáromNap) {
                ki.push(`${i.állománySor}`);
            }
        });
        fs.writeFileSync(állomány, ki.join("\r\n") + "\r\n");
    }
}
