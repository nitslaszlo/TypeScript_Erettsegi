export default class VálasztásiEredmény {
    // 5 19 Ablak Antal -
    private _kerület: number;
    private _szavazatok: number;
    private _vnév: string;
    private _knév: string;
    private _pártJel: string;

    public get nev(): string {
        return `${this._vnév} ${this._knév}`;
    }

    public get szavazatok(): number {
        return this._szavazatok;
    }

    public get kerület(): number {
        return this._kerület;
    }

    public get pártJel2(): string {
        return this._pártJel == "-" ? "Független" : this._pártJel;
    }

    public get párt(): string {
        let teljesnév: string = "";
        switch (this._pártJel) {
            case "GYEP":
                teljesnév = "Gyümölcsevők Pártja";
                break;
            case "HEP":
                teljesnév = "Húsevők Pártja";
                break;
            case "TISZ":
                teljesnév = "Tejivók Szövetsége";
                break;
            case "ZEP":
                teljesnév = "Zöldségevők Párja";
                break;
            case "-":
                teljesnév = "Független jelöltek";
                break;
            default:
                teljesnév = "Hiba!";
                break;
        }
        return teljesnév;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._kerület = parseInt(m[0]);
        this._szavazatok = parseInt(m[1]);
        this._vnév = m[2];
        this._knév = m[3];
        this._pártJel = m[4];
    }
}
