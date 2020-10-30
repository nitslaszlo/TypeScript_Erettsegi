/** Egy megoldást leíró osztály */
export default class Megoldás {
    // Adattagok (helyesMegoldás, kód, válaszok)
    // alapértelmezett a public láthatósági szint, de a tslinter kéri, hogy írjuk ki
    public static helyesMegoldás = ""; // minden példányban közös (statikus) mező

    // privát adattagok (mezők)
    // OOP alapelv: publikus mezőt nem szabad használni!!!
    private _kód: string;
    private _válasz = "";

    // Jellemző (csak olvasható)
    // (speciális adattag, a privát mező írását/olvasását felügyeli)
    public get kód(): string {
        return this._kód;
    }

    // Jellemzők (csak olvasható és írható)
    public get válasz(): string {
        return this._válasz;
    }

    // Minta írható jellemzőre, megoldáshoz nem kell
    public set válasz(value: string) {
        if (value.length === 14) {
            this._válasz = value;
        }
    }

    /** Versenyzőt leíró osztály konstruktora
     * @param {string} sor - A forrás-file egy sora
     * @constructor
     */
    constructor(sor: string) {
        // AB123 BXCDBBACACADBC (egy rekord, két mezővel)
        const mező: string[] = sor.split(" ");
        this._kód = mező[0];
        // Értékadás a publikus jellemzőn keresztül, így
        // már itt is ellenőrzés történik:
        this.válasz = mező[1];
    }

    /**
     * Helyes választ meghatározó jellemző
     * @param {string} index  - A kérdés indexe
     */
    public helyesenVálaszolt(index: number): boolean {
        if (this._válasz[index] === undefined) return false;
        return Megoldás.helyesMegoldás[index] === this._válasz[index];
    }

    /** A helyes válaszok mintája */
    public válaszMinta(): string {
        let minta = "";
        for (let i = 0; i < this._válasz.length; i++) {
            minta += this.helyesenVálaszolt(i) ? "+" : " ";
        }
        return minta;
    }

    /** A versenyző pontszáma */
    public pontszám(): number {
        let szum = 0;
        const pontok: number[] = [3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6];
        for (let i = 0; i < this._válasz.length; i++) {
            if (this.helyesenVálaszolt(i)) szum += pontok[i];
        }
        return szum;
    }
}
