export default class Áthajtás {
    private _nap: number;
    private _idő: string;
    private _rendszám: string;
    private _azon: number;
    private _kmÁllás: number;
    private _behajtás: number;

    // 6. feladathoz:
    // HF: írható-olvasható jellemző készítése
    private _kmÁllásElőző: number;

    // Példa: Csak írható jellemző:
    public set kmÁllásElőző(value: number) {
        if (value > this.kmÁllás) {
            throw new Error("Az előző km állás nem lehet nagyobb az aktuálisnál!");
        } else {
            this._kmÁllásElőző = value;
        }
    }

    public get megtettTáv(): number {
        return this.ezBehajtás ? this._kmÁllás - this._kmÁllásElőző : 0;
    }

    // 6. feladathoz:
    public get ezBehajtás(): boolean {
        return this._behajtás == 1;
    }

    // 5. feladathoz:
    public get kmÁllás(): number {
        return this._kmÁllás;
    }

    // 2. feladathoz:
    public get ezKihajtás(): boolean {
        return this._behajtás == -1;
    }

    // 2. feladathoz:
    public get rendszám(): string {
        return this._rendszám;
    }

    // 2. feladathoz:
    public get nap(): number {
        return this._nap;
    }

    // 3. feladathoz
    public get beKi(): string {
        return this.ezKihajtás ? "ki" : "be";
    }

    // 3. feladathoz
    public get idő(): string {
        return this._idő;
    }

    // 3. feladathoz
    public get azon(): number {
        return this._azon;
    }
    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._nap = parseInt(m[0]);
        this._idő = m[1];
        this._rendszám = m[2];
        this._azon = parseInt(m[3]);
        this._kmÁllás = parseInt(m[4]);
        this._behajtás = m[5] == "1" ? 1 : -1;
        this._kmÁllásElőző = 0;
    }
}
