import Áthaladás from "./Áthaladás";
import fs from "fs";

export default class Megoldás {
    private _áthaladások: Áthaladás[] = [];
    private _stat: Map<number, number> = new Map<number, number>();

    public get elsőBelépő(): number {
        return this._áthaladások[0].szemAzon;
    }

    public get utolsőKilépő(): number {
        const kilépők: Áthaladás[] = this._áthaladások.filter(x => x.irány == "ki");
        const utolsóIndex: number = kilépők.length - 1;
        return kilépők[utolsóIndex].szemAzon;
    }

    private get mapStat(): Map<number, number> {
        const stat: Map<number, number> = new Map<number, number>();
        this._áthaladások.forEach(e => {
            if (stat.has(e.szemAzon)) {
                stat.set(e.szemAzon, (stat.get(e.szemAzon) as number) + 1);
            } else {
                stat.set(e.szemAzon, 1);
            }
        });
        return stat;
    }

    public get társalgóbanRagadt(): string {
        const vissza: number[] = [];
        for (let azon = 1; azon <= 100; azon++) {
            if (this.őTársalgóbanRagadt(azon)) {
                vissza.push(azon);
            }
        }
        return vissza.join(" ");
    }

    public get társalgóbanLegtöbben(): string {
        let aktLétszám: number = 0;
        let maxLétszám: number = 0;
        let maxLétszámIdő: string = "";
        for (const e of this._áthaladások) {
            if (e.irány == "be") {
                aktLétszám++;
            } else {
                aktLétszám--;
            }
            if (aktLétszám > maxLétszám) {
                maxLétszám = aktLétszám;
                maxLétszámIdő = e.idő;
            }
        }
        return maxLétszámIdő;
    }

    public constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor = sor.trim();
                this._áthaladások.push(new Áthaladás(aktSor));
            });

        // _stat Map (szótár) feltöltése:
        this._áthaladások.forEach(e => {
            if (this._stat.has(e.szemAzon)) {
                this._stat.set(e.szemAzon, (this._stat.get(e.szemAzon) as number) + 1);
            } else {
                this._stat.set(e.szemAzon, 1);
            }
        });
    }

    public őTársalgóbanRagadt(azon: number): boolean {
        return this._stat.has(azon) && (this._stat.get(azon) as number) % 2 == 1;
    }

    public áthaladástÍr(fileNeve: string): void {
        const ki: string[] = [];
        for (let azon = 1; azon <= 100; azon++) {
            if (this._stat.has(azon)) {
                ki.push(`${azon} ${this._stat.get(azon)}`);
            }
        }
        fs.writeFileSync(fileNeve, ki.join("\r\n") + "\r\n");
    }

    public mettőlMeddig(azon: number): string {
        let vissza: string = "";
        for (const e of this._áthaladások) {
            if (e.szemAzon == azon) {
                if (e.irány == "be") {
                    vissza += `${e.idő} - `;
                } else {
                    vissza += `${e.idő}\n`;
                }
            }
        }
        const utosóIndex = vissza.length - 1;
        if (vissza[utosóIndex] != "\n") {
            vissza += "\n";
        }
        return vissza;
    }

    public társalgóbanTöltöttIdő(azon: number): number {
        let szumIdő: number = 0;
        let utolsóBelépésIdeje: number = 0;
        for (const e of this._áthaladások) {
            if (e.szemAzon == azon) {
                if (e.irány == "be") {
                    utolsóBelépésIdeje = e.időPercben;
                } else {
                    const kilépésIdeje = e.időPercben;
                    szumIdő += kilépésIdeje - utolsóBelépésIdeje;
                }
            }
        }
        if (this.őTársalgóbanRagadt(azon)) {
            szumIdő += 15 * 60 - utolsóBelépésIdeje;
        }
        return szumIdő;
    }
}
