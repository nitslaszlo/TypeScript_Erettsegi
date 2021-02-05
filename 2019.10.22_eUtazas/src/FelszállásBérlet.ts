import Felszállás from "./Felszállás";
import Segéd from "./Segéd";

export default class FelszállásBérlet extends Felszállás {
    private _típus: string;
    private _érvényes: Date;

    public get érvényesFelszállás(): boolean {
        // +1 napnyi ezredmásodpercet hozzáadunk, mert a bérlet a nap végén jár le:
        const érvényességLejár: number = this._érvényes.valueOf() + 24 * 60 * 60 * 1000;
        return this._idő.valueOf() < érvényességLejár;
    }

    public get lejárHáromNap(): boolean {
        return this.érvényesFelszállás && Segéd.napokszama2(this._idő, this._érvényes) <= 3;
    }

    public get kedvezményesUtazás(): boolean {
        return this.érvényesFelszállás && ["TAB", "NYB"].includes(this._típus);
    }

    public get ingyenesUtazás(): boolean {
        return this.érvényesFelszállás && ["NYP", "RVS", "GYK"].includes(this._típus);
    }

    public get állománySor(): string {
        // +1 -  TS-JS Hónapok számozása 0-tól indul:
        // .padStart(2, "0") - vezető nullák beszúrása egyjegyű napok elé:
        const hónap: string = (this._érvényes.getMonth() + 1).toString().padStart(2, "0");
        const nap: string = this._érvényes.getDate().toString().padStart(2, "0");
        return `${this._kártyaAzon} ${this._érvényes.getFullYear()}-${hónap}-${nap}`;
    }

    public constructor(sor: string) {
        super(sor);
        const m: string[] = sor.split(" ");
        this._típus = m[3];
        const év: number = parseInt(m[4].substr(0, 4));
        // -1 - TS-JS a hónapok számozása 0-val indul:
        const hónap: number = parseInt(m[4].substr(4, 2)) - 1;
        const nap: number = parseInt(m[4].substr(6, 2));
        this._érvényes = new Date(év, hónap, nap);
    }
}
