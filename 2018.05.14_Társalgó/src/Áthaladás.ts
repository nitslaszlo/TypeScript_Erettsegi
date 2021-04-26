export default class Áthaladás {
    private _óra: number;
    private _perc: number;
    private _szemAzon: number;
    private _irány: string;

    public get szemAzon(): number {
        return this._szemAzon;
    }

    public get irány(): string {
        return this._irány;
    }

    public get idő(): string {
        return `${this._óra.toString().padStart(2, "0")}:${this._perc.toString().padStart(2, "0")}`;
    }

    public get időPercben(): number {
        return this._óra * 60 + this._perc;
    }

    public constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._óra = parseInt(m[0]);
        this._perc = parseInt(m[1]);
        this._szemAzon = parseInt(m[2]);
        this._irány = m[3];
    }
}
