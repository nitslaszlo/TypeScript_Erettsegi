import fs from "fs";
import VálasztásiEredmény from "./VálasztásiEredmény";

export default class Megoldás {
    private _eredmények: VálasztásiEredmény[] = [];

    public get jelöltekSzáma(): number {
        return this._eredmények.length;
    }

    public get szavazatokSzáma(): number {
        let szum: number = 0;
        for (const e of this._eredmények) {
            szum += e.szavazatok;
        }
        return szum;
    }

    public get szavazottSzázalék(): string {
        return ((this.szavazatokSzáma / 12345) * 100).toFixed(2) + "%";
    }

    private get eredmenyStat(): Map<string, number> {
        const stat: Map<string, number> = new Map<string, number>();
        this._eredmények.forEach(e => {
            if (stat.has(e.párt)) {
                const régiÉrték: number = stat.get(e.párt) as number;
                const újÉrték: number = régiÉrték + e.szavazatok;
                stat.set(e.párt, újÉrték);
            } else {
                stat.set(e.párt, e.szavazatok);
            }
        });
        return stat;
    }

    public get szavazatStat(): string {
        let vissza: string = "";
        const szavazatokSzáma: number = this.szavazatokSzáma;
        this.eredmenyStat.forEach((value, key) => {
            vissza += `${key}= ${((value / szavazatokSzáma) * 100).toFixed(2)} %\n`;
        });
        return vissza;
    }

    private get legtöbbSzavazat(): number {
        let max = -1;
        this._eredmények.forEach(e => {
            if (e.szavazatok > max) {
                max = e.szavazatok;
            }
        });
        return max;
    }

    public get győztesKépviselők(): string {
        let vissza: string = "";
        const max: number = this.legtöbbSzavazat;
        this._eredmények.forEach(e => {
            if (e.szavazatok == max) {
                vissza += `${e.nev} ${e.pártJel2}\n`;
            }
        });
        return vissza;
    }

    constructor(forrás: string) {
        const sorok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (const sor of sorok) {
            const aktSor: string = sor.trim(); // Maradék vezérlő karakterek törlése
            // Tényleges adatsor ellenőrzése:
            if (aktSor.length != 0) {
                this._eredmények.push(new VálasztásiEredmény(aktSor));
            }
        }
    }

    private képviselőIndexe(név: string): number {
        let index: number = -1;
        for (let i = 0; i < this._eredmények.length; i++) {
            if (this._eredmények[i].nev == név) {
                index = i;
                break;
            }
        }
        return index;
    }

    public képviselőKeresése(név: string): string {
        const index: number = this.képviselőIndexe(név);
        if (index == -1) {
            return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";
        } else {
            return `${név} ${this._eredmények[index].szavazatok} szavazatot kapott.`;
        }
    }

    public állománytÍr(állományneve: string): void {
        const stat: Map<number, VálasztásiEredmény> = new Map<number, VálasztásiEredmény>();
        this._eredmények.forEach(e => {
            if (stat.has(e.kerület)) {
                const régiEredmény: number = (stat.get(e.kerület) as VálasztásiEredmény).szavazatok;
                if (e.szavazatok > régiEredmény) {
                    stat.set(e.kerület, e);
                }
            } else {
                stat.set(e.kerület, e);
            }
        });
        let ki: string = "";
        for (let kerület = 1; kerület <= 8; kerület++) {
            ki += `${kerület}.kerület: ${stat.get(kerület)?.nev} ${stat.get(kerület)?.pártJel2}\n`;
        }
        fs.writeFileSync(állományneve, ki);
    }
}
