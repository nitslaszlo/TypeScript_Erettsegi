/** Be- és kilépést leíró osztály */
export default class BeKiLép {
    private _vazon: string;
    private _részleg: number;
    private _beKi: number; // 0->be 1->ki
    private _ido: Date;

    public get vazon(): string {
        return this._vazon;
    }

    public get részleg(): number {
        return this._részleg;
    }

    public get beKi(): number {
        return this._beKi;
    }

    public get ido(): Date {
        return this._ido;
    }

    /**
     * Be- és kilépést leíró osztály konstruktora
     * @constructor
     * @param {string} sor A forrás-file egy sora
     */
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._vazon = m[0];
        this._részleg = parseInt(m[1], 10); // 1-4 számozza a feladat a részlegeket
        this._beKi = parseInt(m[2], 10); // 0 vagy 1
        this._ido = new Date(1970, 1, 1, parseInt(m[3], 10), parseInt(m[4], 10), parseInt(m[5], 10));
    }
}
