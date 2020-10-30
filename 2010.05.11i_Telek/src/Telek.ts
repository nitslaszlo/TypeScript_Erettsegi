export default class Telek {
    private _házszám: number; // házszám
    private _szélesség: number; // szélesség
    private _hosszúság: number; // hosszúság
    private _telekKezdete: number; // telek kezdete a merőleges utcától

    public get házszám(): number {
        return this._házszám;
    }

    public get szélesség(): number {
        return this._szélesség;
    }

    public get hosszúság(): number {
        return this._hosszúság;
    }

    public set hosszúság(value: number) {
        this._hosszúság = value;
    }

    public get telekKezdete(): number {
        return this._telekKezdete;
    }

    public set telekKezdete(value: number) {
        this._telekKezdete = value;
    }

    /** Jólétsori telek-e?
     * @returns boolean
     */
    public get isJs(): boolean {
        return this._házszám % 2 === 0;
    }

    /** Gazdagsori telek-e:
     * @returns boolean
     */
    public get isGs(): boolean {
        return !this.isJs;
    }

    /** Telek területe
     * @returns number
     */
    public get terület(): number {
        return this._szélesség * this._hosszúság;
    }

    /** Telelk vége a merőleges utcától
     * @returns number
     */
    get telekVége(): number {
        return this._telekKezdete + this._szélesség;
    }

    /** Telek után fizetendő adó fabatkában
     * @returns number
     */
    get adó(): number {
        // telek után fizetendő adó
        let sadó: number = this.terület * 51;
        if (this.terület > 700) sadó = 700 * 51 + (this.terület % 700) * 39;
        if (this.terület > 1000) sadó = 700 * 51 + 300 * 39 + 200;
        if (this._szélesség <= 15 || this._hosszúság <= 25) sadó *= 0.8;
        return Math.round(sadó / 100) * 100; // 100-ra kerekítünk
    }
    /** Telek osztály konstuktora
     * @param  {string} adatok adatsor
     */
    constructor(adatok: string) {
        const s: string[] = adatok.split(" ");
        this._házszám = parseInt(s[0], 10);
        this._szélesség = parseInt(s[1], 10);
        this._hosszúság = parseInt(s[2], 10);
        this._telekKezdete = 0;
    }
}
