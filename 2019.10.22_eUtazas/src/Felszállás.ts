export default abstract class Felszállás {
    protected _megállóSorszáma: number;
    protected _idő: Date;
    protected _kártyaAzon: string;

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
