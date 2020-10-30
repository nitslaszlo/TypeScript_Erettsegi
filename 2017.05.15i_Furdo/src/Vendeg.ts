/** Vendéget leíró osztály */
export default class Vendég {
    private _vazon: string;
    private _részlegek: number[] = [0, 0, 0, 0, 0]; // melyik részleget hányszor használta
    private _szaunábanEltöltöttIdőMs: number = 0; // 6. feladathoz
    private _jött: Date;
    private _ment: Date;

    public get vazon(): string {
        return this._vazon;
    }

    public get részlegek(): number[] {
        return this._részlegek;
    }

    public get szaunábanEltöltöttIdőMs(): number {
        return this._szaunábanEltöltöttIdőMs;
    }

    public set szaunábanEltöltöttIdőMs(value: number) {
        this._szaunábanEltöltöttIdőMs = value;
    }

    public get jött(): Date {
        return this._jött;
    }

    public get ment(): Date {
        return this.ment;
    }

    public set ment(value: Date) {
        this._ment = value;
    }

    /**
     * Egy vendéget leíró osztály konstruktora
     * @constructor
     * @param {string} vazon - A vendég azonosítója
     * @param {Date} idő - A vendég érkezésének ideje
     */
    constructor(vazon: string, idő: Date) {
        this._vazon = vazon;
        this._részlegek[0] = 2; // öltözőbe lép a példányosításkor
        this._jött = idő;
        this._ment = idő;
    }

    /** Hány részegben járt a vendég */
    get részlegDb(): number {
        let db: number = 0;
        for (const i of this._részlegek) {
            db += i;
        }
        return db / 2; // be-ki időpontok végett kell a darabszám felezése
    }

    /** Ezredmásodpercben megadja, hogy a vendég mennyi időt töltött a fürdőben */
    get fürdőbenEltöltöttIdőMs(): number {
        // 4. feladat rendezéséhez
        return this._ment.getTime() - this._jött.getTime();
    }

    /** HH:MM:SS alakban megadja, hogy a vendég mennyi időt töltött a fürdőben */
    get FürdőbenEltöltöttIdő(): string {
        // 4. feladathoz (HH:MM:SS)
        return new Date(this.fürdőbenEltöltöttIdőMs).toISOString().slice(11, -5);
    }

    /** HH:MM:SS alakban megadja, hogy a vendég mennyi időt töltött a szaunában */
    get szaunábanEltöltöttIdő(): string {
        // 6. feladathoz (HH:MM:SS)
        return new Date(this._szaunábanEltöltöttIdőMs).toISOString().slice(11, -5);
    }
}
