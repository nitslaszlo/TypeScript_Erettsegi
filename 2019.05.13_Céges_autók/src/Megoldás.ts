import Áthajtás from "./Áthajtás";
import fs from "fs";

export default class Megoldás {
    private _forgalom: Áthajtás[] = [];

    public get utolsóKihatás(): Áthajtás {
        const kihajtások: Áthajtás[] = this._forgalom.filter(x => x.ezKihajtás);
        const utolsóIndex = kihajtások.length - 1;
        return kihajtások[utolsóIndex];
    }

    public get kintMaradtAutókSzáma(): number {
        let autókSzámaOdakint = 0;
        for (const áthajtás of this._forgalom) {
            autókSzámaOdakint += áthajtás.ezKihajtás ? 1 : -1;
        }
        return autókSzámaOdakint;
    }

    public get távolságStatisztika(): string {
        // HF1: megoldás úgy, hogy a rendszámok és az autók száma
        // nem "számítható" (előállítható)
        // Megoldási javaslat 2db Map
        // Map1: Tárolná az első kihajtások km állását
        // Map2: Tárolná az utolsó ismert km állást
        // Kivonás!
        // Map kezelése: lsd. korábbi projektek!
        let vissza: string = "";
        for (let i = 0; i < 10; i++) {
            const aktRendzsám = `CEG30${i}`;
            const aktÁthajtások: Áthajtás[] = this._forgalom.filter(x => x.rendszám == aktRendzsám);
            const utolsóIndex = aktÁthajtások.length - 1;
            const indulóKmÁllás: number = aktÁthajtások[0].kmÁllás;
            const záróKmÁllás: number = aktÁthajtások[utolsóIndex].kmÁllás;
            const megtettTáv = záróKmÁllás - indulóKmÁllás;
            vissza += `${aktRendzsám} ${megtettTáv} km\n`;
        }
        return vissza;
    }

    public get maxTávÁthajtás(): Áthajtás {
        let max: Áthajtás = this._forgalom[0];
        for (const aktÁthajtás of this._forgalom) {
            if (aktÁthajtás.megtettTáv > max.megtettTáv) {
                max = aktÁthajtás;
            }
        }
        return max;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length != 0) {
                    const aktÁthajtás = new Áthajtás(aktSor);
                    // HF2: Megoldás máshogy:
                    if (aktÁthajtás.ezBehajtás) {
                        const előzőÁthajtások: Áthajtás[] = this._forgalom.filter(x => x.rendszám == aktÁthajtás.rendszám);
                        const utolsóIndex: number = előzőÁthajtások.length - 1;
                        aktÁthajtás.kmÁllásElőző = előzőÁthajtások[utolsóIndex].kmÁllás;
                    }
                    this._forgalom.push(aktÁthajtás);
                }
            });
    }

    public forgalom(inputNap: number): string {
        let vissza: string = "";
        for (const áthajtás of this._forgalom) {
            if (áthajtás.nap == inputNap) {
                vissza += `${áthajtás.idő} ${áthajtás.rendszám} ${áthajtás.azon} ${áthajtás.beKi}\n`;
            }
        }
        return vissza;
    }
}
