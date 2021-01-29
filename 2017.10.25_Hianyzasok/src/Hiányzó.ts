import Segéd from "./Segéd";

/** Egy hiányzó tanulót leíró osztály */
export default class Hiányzó {
    // mezők (adattagok), csak privát láthatósági szintűek lehetnek
    private _név: string;
    private _hónap: number;
    private _nap: number;
    private _mulasztások: string; // A napi hiányzást leíró minta O, I, X és N karakterekből áll

    // jellemző (a privát mező olvasását végzi)
    public get név(): string {
        return this._név;
    }

    /** Az osztály konstruktora
     * @constructor
     * @param {string} dátumSor - A forrás file dátumot kódoló sora
     * @param {string} sor - A forrás file egy hiányzót kódoló sora
     */
    constructor(dátumSor: string, sor: string) {
        let m: string[] = dátumSor.split(" ");
        this._hónap = parseInt(m[1], 10); // 10 paraméter jelzi, hogy a sztring (itt m[1]) milyen számrendszerben van
        this._nap = parseInt(m[2], 10); // 10-> decimális, 2-> bináris, 16-> hexadecimális
        m = sor.split(" ");
        this._név = `${m[0]} ${m[1]}`; // vezetéknév és a keresztnév összefűzése
        this._mulasztások = m[2]; // hiányzást leíró 7 karakter hosszú minta
    }

    /** Megadott napon és tanórában volt-e hiányzás (X vagy I) a tanulónak
     * @param  {string} nap - A nap neve (pl. hetfo)
     * @param  {number} óra - A tanóra sorszáma
     * @returns boolean - Igaz, ha volt hiányzás, egyébként hamis
     */
    public voltHiányzás(nap: string, óra: number): boolean {
        const óraIndexe: number = óra - 1;
        return nap === Segéd.hetNapja(this._hónap, this._nap) && (this._mulasztások[óraIndexe] === "X" || this._mulasztások[óraIndexe] === "I");
    }

    /** Igazolt hiányzások száma */
    get igazoltDb(): number {
        return this.megszámol("X");
    }

    /** Igazolatlan hiányzások száma */
    get igazolatlanDb(): number {
        return this.megszámol("I");
    }

    /** Hiányzások száma */
    get hianyzasDb(): number {
        return this.igazoltDb + this.igazolatlanDb;
    }

    /** Megadott karakter darabszáma a mulasztások karakterláncban
     * @param {string} ch - A megszámlálandó karakter (hiányzás típus)
     * @returns number - Karakterek darabszáma
     */
    private megszámol(ch: string): number {
        // JavaScript/TypeScript-ben nincs karakter adattípus,
        // a karaktereket sztring típussal kezeljük
        let darab = 0;
        for (const mulasztas of this._mulasztások) {
            // a mulasztas ciklusváltozó is sztring típusú lesz
            if (mulasztas === ch) darab++;
        }
        return darab;
    }
}
