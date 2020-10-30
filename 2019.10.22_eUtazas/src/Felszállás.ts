export default abstract class Felszállás {
    protected _megállóSorszáma: number;
    protected _idő: Date;
    protected _kártyaAzon: string;

    // 6. feladat: Készítsen  függvényt napokszama  néven  az  alábbi  algoritmus  alapján.
    // Az  algoritmus a paraméterként megadott két dátumhoz (év, hónap, nap) megadja a közöttük eltelt napok számát!
    // (A MOD a maradékos osztást, a DIV az egészrészes osztást jelöli.)
    // Az algoritmust a fuggveny.txt fájlban is megtalálja. A függvényt a következő feladat megoldásához felhasználhatja.
    public static napokszama(e1: number, h1: number, n1: number, e2: number, h2: number, n2: number): number {
        h1 = (h1 + 9) % 12; // TS-JS maradékos osztás: a MOD b -> a % b
        e1 = e1 - ~~(h1 / 10); // TS-JS egész osztás: a DIV b -> ~~(a / b)
        const d1 = 365 * e1 + ~~(e1 / 4) - ~~(e1 / 100) + ~~(e1 / 400) + ~~((h1 * 306 + 5) / 10) + n1 - 1;
        h2 = (h2 + 9) % 12;
        e2 = e2 - ~~(h2 / 10);
        const d2 = 365 * e2 + ~~(e2 / 4) - Math.trunc(e2 / 100) + ~~(e2 / 400) + ~~((h2 * 306 + 5) / 10) + n2 - 1;
        return d2 - d1;
    }

    // Saját napok száma függvény a Date típusú értékek különbségével [ms] (nem a megoldás része):
    public static napokszama2(d1: Date, d2: Date): number {
        const érvényességLejárMs: number = d2.valueOf();
        const utazásNapjaMs: number = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).valueOf();
        const diffMS = érvényességLejárMs - utazásNapjaMs;
        return ~~(diffMS / (1000 * 60 * 60 * 24)); //  Ms to day conversion
    }

    public get megállóSorszáma(): number {
        return this._megállóSorszáma;
    }

    public get érvényesFelszállás(): boolean {
        return false;
    }

    public get kedvezményesUtazás(): boolean {
        return false;
    }

    public get ingyenesUtazás(): boolean {
        return false;
    }

    public get lejárHáromNap(): boolean {
        return false;
    }

    public constructor(sor: string) {
        const m: string[] = sor.split(" ");

        this._megállóSorszáma = parseInt(m[0]);

        // Felszállás időpontja: ééééhhnn-óópp
        const év = parseInt(m[1].substr(0, 4));
        const hónap = parseInt(m[1].substr(4, 2)) - 1; // TS-JS a hónapok számozása 0-val indul!!!
        const nap = parseInt(m[1].substr(6, 2));
        const óra = parseInt(m[1].substr(9, 2));
        const perc = parseInt(m[1].substr(11, 2));
        this._idő = new Date(év, hónap, nap, óra, perc, 0, 0);
        this._kártyaAzon = m[2];
    }
}
