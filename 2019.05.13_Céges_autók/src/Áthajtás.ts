export default class Áthajtás {
    private _nap: number;
    private _idő: string;
    private _rendszám: string;
    private _azon: number;
    private _kmÁllás: number;
    private _behajtás: number; // true -> be, false -> ki

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._nap = parseInt(m[0]);
        this._idő = m[1];
        this._rendszám = m[2];
        this._azon = parseInt(m[3]);
        this._kmÁllás = parseInt(m[4]);
        this._behajtás = m[5] == "1" ? 1 : -1;
    }
}
